const baseName = 'playersBase';

const storeName = 'playersStore';

function logerr(err:Event) {
  console.log(err);
}

function connectDB(f:CallableFunction) {
  const request = indexedDB.open(baseName, 1);
  request.onerror = logerr;
  request.onsuccess = function () {
    f(request.result);
  };

  request.onupgradeneeded = function () {
    const db = request.result;
    if (!db.objectStoreNames.contains(storeName)) { // если хранилище "books" не существует
      db.createObjectStore(storeName, { keyPath: 'id' }); // создаем хранилище
    }

    // const result = e.currentTarget;
    // result.createObjectStore(storeName, { keyPath: "path" });
    connectDB(f);
  };
}

function getplayer(player:IDBKeyPath, f:CallableFunction) {
  connectDB((db:IDBDatabase) => {
    const request = db.transaction([storeName], 'readonly').objectStore(storeName).get(+player);
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

    // if(store.mozGetAll)
    //   store.mozGetAll().onsuccess = function(e){
    //     f(e.target.result);
    //   };
    // else
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

  constructor(player:unknown) {
    this.player = player;
  }

  save() {
    setplayer(this.player);
  }

  load() {
    getplayer('1', console.log);
  }
}
