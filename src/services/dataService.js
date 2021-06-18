import Data from "./../data/data.json"
import OptionDefaults from  "./../data/options.json"
import _ from 'lodash'
export default {
    reset() {
        var d = _.cloneDeep(Data);
        
        var response = {
            levels: d.levels,
            dungeons: d.dungeons,
            options: _.cloneDeep(OptionDefaults)
        }
        return response
    },
}