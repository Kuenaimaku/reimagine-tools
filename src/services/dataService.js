import Data from "@/data/data.json"
import OptionDefaults from  "@/data/options.json"
import _ from 'lodash'
export default {
    getData(){
        var d = _.cloneDeep(Data);
        var response = {
            levels: d.levels,
            dungeons: d.dungeons,
        }
        return response;
    },

    getAppleDefaults(){
        var options = _.cloneDeep(OptionDefaults)
        return options.apple;
    },

    getBookDefaults(){
        var options = _.cloneDeep(OptionDefaults)
        return options.book;
    }
}