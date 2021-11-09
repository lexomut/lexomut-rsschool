import appState from '../appState/appState';

const baseName = 'playersBase';

const storeName = 'playersStore';

function logerr(err:Event) {
  console.log(err);
}

function connectDB(f:CallableFunction) {
  const request = indexedDB.open(baseName, 9);
  request.onerror = logerr;
  request.onsuccess = function () {
    f(request.result);
  };

  request.onupgradeneeded = function () {
    console.log('onupgradeneeded сработал');
    const db = request.result;
    console.log('проверяем существует ли хранилище с этим именем ');
    if (db.objectStoreNames.contains(storeName)) {
      console.log('существует  ', db.objectStoreNames);
      db.deleteObjectStore(storeName);
      console.log('удалили');
      console.log('создаем хранилище');
      db.createObjectStore(storeName, { keyPath: 'email' }); // создаем хранилище
      console.log('создали');
    } else {
      console.log('не существует');// если хранилище "books" не существует
      console.log('создаем хранилище');
      db.createObjectStore(storeName, { keyPath: 'email' }); // создаем хранилище
      console.log('создали');
    }
    connectDB(f);
  };
}

function getplayer(player:IDBKeyPath, f:CallableFunction) {
  connectDB((db:IDBDatabase) => {
    const request = db.transaction([storeName], 'readonly').objectStore(storeName).get(player);
    request.onerror = logerr;
    request.onsuccess = function () {
      f(request.result ? request.result : -1);
    };
  });
}

function getStorage(f:CallableFunction) {
  connectDB((db:IDBDatabase) => {
    const rows:unknown[] = [];
    const store = db.transaction([storeName], 'readonly').objectStore(storeName);
    const request = store.openCursor();
    request.onsuccess = function () {
      const cursor = request.result;
      if (cursor) {
        const { value } = cursor;
        rows.push(value);
        cursor.continue();
      } else {
        f(rows);
      }
    };
  });
}

function setplayer(player:unknown) {
  connectDB((db: IDBDatabase) => {
    const request = db.transaction([storeName], 'readwrite').objectStore(storeName).put(player);
    request.onerror = logerr;
    console.log('запиисалось в idb');
    request.onsuccess = function () {
      return request.result;
    };
  });
}

function delplayer(player:IDBKeyPath) {
  connectDB((db: IDBDatabase) => {
    const request = db.transaction([storeName], 'readwrite').objectStore(storeName).delete(player);
    request.onerror = logerr;
    request.onsuccess = function () {
      console.log('player delete from DB:', player);
    };
  });
}

export class IDB {
  private player: unknown;

  save = (playerObj:unknown) => {
    setplayer(playerObj);
  };

  load = (email:string, func = console.log) => {
    getplayer(email, func);
  };

  loadAll = (func = console.log) => {
    getStorage(func);
  };
}
