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