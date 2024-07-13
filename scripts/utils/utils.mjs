export function flattenObj(obj, parent, res = {}){
    for(let key in obj){
        let propName = parent ? parent + '.' + key : key;
        if(typeof obj[key] == 'object'){
            flattenObj(obj[key], propName, res);
        } else {
            res[propName] = obj[key];
        }
    }
    return res;
}

/**
 * Create an ID from the input truncating or padding the value to make it reach 16 characters.
 * @param {string} id
 * @returns {string}
 */
export function staticID(id) {
    if ( id.length >= 16 ) return id.substring(0, 16);
    return id.padEnd(16, "0");
  }

  export function _onUpdateODMG(data, options) {
    if ( id.length >= 16 ) return id.substring(0, 16);
    return id.padEnd(16, "0");
  }