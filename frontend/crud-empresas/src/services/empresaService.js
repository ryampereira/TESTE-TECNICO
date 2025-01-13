const API_URL = 'http://localhost:5001/api/companies';

const getEmpresas = () => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('empresaDB', 2); 
  
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
  
        if (!db.objectStoreNames.contains('empresas')) {
          const store = db.createObjectStore('empresas', { keyPath: 'id', autoIncrement: true });
          store.createIndex('cnpj', 'cnpj', { unique: true }); 
        }
      };
  
      request.onsuccess = (event) => {
        const db = event.target.result;
        const transaction = db.transaction('empresas', 'readonly');
        const store = transaction.objectStore('empresas');
        const getAllRequest = store.getAll();
  
        getAllRequest.onsuccess = () => {
          resolve(getAllRequest.result);
        };
  
        getAllRequest.onerror = (error) => {
          reject(`Erro ao obter empresas do IndexedDB: ${error.target.error}`);
        };
      };
  
      request.onerror = (error) => {
        reject(`Erro ao acessar o IndexedDB: ${error.target.error}`);
      };
    });
  };
  
  const saveEmpresas = (empresas) => {
    return new Promise((resolve, reject) => {
      console.log('Iniciando o salvamento de empresas:', empresas);
  
      const request = indexedDB.open('empresaDB', 2);
  
      request.onupgradeneeded = (event) => {
        console.log('[IndexedDB] onupgradeneeded acionado. Verificando estrutura do banco...');
        const db = event.target.result;
  
        if (!db.objectStoreNames.contains('empresas')) {
          console.log('[IndexedDB] Criando objectStore "empresas" e índice único "cnpj"...');
          const store = db.createObjectStore('empresas', { keyPath: 'id', autoIncrement: true });
          store.createIndex('cnpj', 'cnpj', { unique: true });
        } else {
          console.log('[IndexedDB] objectStore "empresas" já existe.');
        }
      };
  
      request.onsuccess = (event) => {
        console.log('[IndexedDB] Conexão estabelecida com sucesso.');
        const db = event.target.result;
  
        const transaction = db.transaction('empresas', 'readwrite');
        const store = transaction.objectStore('empresas');
        const index = store.index('cnpj');
  
        empresas.forEach((empresa) => {
          console.log('[IndexedDB] Tentando salvar empresa:', empresa);
  
          const getRequest = index.get(empresa.cnpj);
  
          getRequest.onsuccess = () => {
            const existingCompany = getRequest.result;
            console.log('[IndexedDB] Empresa encontrada no banco:', existingCompany);
  
            if (existingCompany) {
              if (existingCompany.id === empresa.id) {
                console.log(`[IndexedDB] Atualizando empresa com CNPJ ${empresa.cnpj}...`);
                const updateRequest = store.put(empresa); 
  
                updateRequest.onsuccess = () => {
                  console.log('[IndexedDB] Empresa atualizada com sucesso:', empresa);
                };
  
                updateRequest.onerror = (error) => {
                  console.error('[IndexedDB] Erro ao atualizar empresa:', empresa, error.target.error);
                };
              } else {
                console.warn(`[IndexedDB] Empresa com o CNPJ ${empresa.cnpj} já existe com outro ID. Não podemos atualizar.`);
                alert(`O CNPJ ${empresa.cnpj} foi atualizado`);
              }
            } else {
              console.log(`[IndexedDB] CNPJ ${empresa.cnpj} não encontrado. Inserindo nova empresa...`);
              const addRequest = store.add(empresa); 
  
              addRequest.onsuccess = () => {
                console.log('[IndexedDB] Empresa salva com sucesso:', empresa);
              };
  
              addRequest.onerror = (error) => {
                console.error('[IndexedDB] Erro ao salvar nova empresa:', empresa, error.target.error);
              };
            }
          };
  
          getRequest.onerror = (error) => {
            console.error('[IndexedDB] Erro ao verificar CNPJ no banco de dados:', error.target.error);
          };
        });
  
        transaction.oncomplete = () => {
          console.log('[IndexedDB] Transação de salvamento concluída.');
          resolve('Empresas salvas no IndexedDB');
        };
  
        transaction.onerror = (error) => {
          console.error('[IndexedDB] Erro na transação de salvamento:', error.target.error);
          reject(`Erro ao salvar empresas no IndexedDB: ${error.target.error}`);
        };
      };
  
      request.onerror = (error) => {
        console.error('[IndexedDB] Erro ao abrir conexão:', error.target.error);
        reject(`Erro ao acessar o IndexedDB: ${error.target.error}`);
      };
    });
  };
  
    
const syncEmpresas = async () => {
  try {
    const empresas = await getEmpresas(); 
    if (empresas.length === 0) {
      console.warn('Não há empresas para sincronizar.');
      return;
    }

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(empresas),
    });

    if (!response.ok) {
      throw new Error('Falha na sincronização com a API');
    }

    console.log('Empresas sincronizadas com sucesso');
  } catch (error) {
    console.error('Erro ao sincronizar com a API:', error);
  }
};

// Função para atualizar uma empresa
const updateEmpresa = async (empresa) => {
  try {
    const response = await fetch(`${API_URL}/companies/${encodeURIComponent(empresa.cnpj)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(empresa),
    });

    if (!response.ok) {
      throw new Error('Falha ao atualizar empresa no backend');
    }

    console.log('Empresa atualizada com sucesso');
  } catch (error) {
    console.error('Erro ao atualizar empresa:', error);
  }
};

// Função para excluir uma empresa
const deleteEmpresa = async (cnpj) => {
  try {
    const response = await fetch(`${API_URL}/companies/${encodeURIComponent(cnpj)}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Falha ao excluir empresa no backend');
    }

    console.log('Empresa excluída com sucesso');
  } catch (error) {
    console.error('Erro ao excluir empresa:', error);
  }
};

export const empresaService = {
  getEmpresas,
  saveEmpresas,
  syncEmpresas,
  updateEmpresa,
  deleteEmpresa,
};
