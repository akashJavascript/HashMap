function HashMap() {
  let mapLength = 16;
  let map = Array(16);
  function hash(key, size = map.length) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode = hashCode % size;
    }
    return hashCode;
  }
  function resizeMap(newSize) {
    let oldMap = map;
    let newMap = Array(newSize);
    for (let i = 0; i < oldMap.length; i++) {
      if (oldMap[i]) {
        for (let j = 0; j < oldMap[i].length; j++) {
          let index = hash(oldMap[i][j].key, newSize);
          if (!newMap[index]) {
            newMap[index] = [];
          }
          newMap[index].push(oldMap[i][j]);
        }
      }
    }
    map = newMap;
  }
  function checkLoadFactor() {
    const LOAD_FACTOR = 0.75;
    if (length() / map.length >= LOAD_FACTOR) {
      resizeMap(map.length * 2);
    }
  }
  function set(key, value) {
    let index = hash(key);
    if (index < 0 || index >= map.length) {
      throw new Error('Trying to access index out of bound');
    }
    if (!map[index]) {
      map[index] = []; // Initialize as an array if it doesn't exist
    }
    // Check if the key already exists
    for (let i = 0; i < map[index].length; i++) {
      if (map[index][i].key === key) {
        map[index][i].value = value;
        return;
      }
    }
    // Key does not exist, add a new entry
    map[index].push({ key: key, value: value });
    checkLoadFactor();
  }

  function get(key) {
    let index = hash(key);
    if (!map[index]) {
      return null;
    }
    // Search for the key in the array at map[index]
    for (let i = 0; i < map[index].length; i++) {
      if (map[index][i].key === key) {
        return map[index][i].value;
      }
    }
    return null; // Key not found in the array
  }
  function has(key) {
    let index = hash(key);
    if (!map[index]) {
      return false; // If the bucket is empty, the key definitely doesn't exist
    }
    // Check if the key exists in the bucket
    for (let i = 0; i < map[index].length; i++) {
      if (map[index][i].key === key) {
        return true; // Key found in the bucket
      }
    }
    return false; // Key not found in the bucket
  }

  function remove(key) {
    let index = hash(key);
    if (has(key) === false) {
      return false;
    } else {
      for (let i = 0; i < map[index].length; i++) {
        if (map[index][i].key === key) {
          map[index].splice(i, 1);
          return true;
        }
      }
    }
    checkLoadFactor();
  }
  function length() {
    let numEl = 0;
    for (let i = 0; i < map.length; i++) {
      if (map[i]) {
        numEl += map[i].length;
      }
    }
    return numEl;
  }
  function clear() {
    let mapSize = map.length;
    map = Array(mapSize);
  }
  function keys() {
    let keysArr = [];
    for (let i = 0; i < map.length; i++) {
      if (map[i]) {
        for (let j = 0; j < map[i].length; j++) {
          keysArr.push(map[i][j].key);
        }
      }
    }
    return keysArr;
  }
  function values() {
    let valuesArr = [];
    for (let i = 0; i < map.length; i++) {
      if (map[i]) {
        for (let j = 0; j < map[i].length; j++) {
          valuesArr.push(map[i][j].value);
        }
      }
    }
    return valuesArr;
  }
  function entries() {
    let entriesArr = [];
    for (let i = 0; i < map.length; i++) {
      if (map[i]) {
        for (let j = 0; j < map[i].length; j++) {
          entriesArr.push([map[i][j].key, map[i][j].value]);
        }
      }
    }
    return entriesArr;
  }
  function getMap() {
    return map;
  }
  return {
    hash,
    set,
    getMap,
    get,
    has,
    remove,
    length,
    clear,
    keys,
    values,
    entries,
  };
}

let hashMap = HashMap();
hashMap.set('key1', 'A');
hashMap.set('key2', 'B');
hashMap.set('key3', 'C');
hashMap.set('key4', 'D');
hashMap.set('key5', 'E');
hashMap.set('key6', 'F');
hashMap.set('key7', 'G');
hashMap.set('key8', 'H');
hashMap.set('key9', 'I');
hashMap.set('key10', 'J');
hashMap.set('key11', 'K');
hashMap.set('key12', 'L');
for (let i = 0; i < 1000; i++) {
  hashMap.set(`key${i}`,`a`)  
}
// hashMap.remove('key13');
// hashMap.clear();
console.log(hashMap.getMap());
// console.log(hashMap.keys());
// console.log(hashMap.values());
// console.log(hashMap.entries());
// console.log(hashMap.length());
// console.log(hashMap.get('key0'));
// console.log(hashMap.has('key0'));
