import listqueryargs from '#commons/configs/queryargs.js';

//Query args separate
import {REQUEST_QUERY_ARGS_SEPARATOR} from '#commons/configs/configs.js';

/**
 * Parse request query string to variables
 * @param query
 * @return {{}}
 */
export default function(query){
    
    let args = {}, name, current;
    let parts = query.split(REQUEST_QUERY_ARGS_SEPARATOR);
    
    if(!parts.length){
        return false;
    }
    
    for(let i = 0; i < parts.length; i++){
        current = parts[i];
        
        //get name first
        if(listqueryargs[current]){
            if(name){
                args[listqueryargs[name]] = true;
            }
            
            if(i == (parts.length - 1)){
                args[listqueryargs[current]] = true;
            }
            
            name = current;
            continue;
        }
        
        if(!listqueryargs[current] && name){
            args[listqueryargs[name]] = current;
            name = null;
        }
        
    }
    
    if(!suu.isEmpty(args)){
        suu.forIn(args, (value, key) => {
            args[key] = suu.input.get(value);
        });
    }
    
    return args;
}