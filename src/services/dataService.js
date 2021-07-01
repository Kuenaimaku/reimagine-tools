import Data from "@/data/data.json"
import OptionDefaults from  "@/data/options.json"
import _ from 'lodash'
export default {
    getData(){
        var d = _.cloneDeep(Data);
        var response = {
            levels: d.levels,
            dungeons: d.dungeons,
            expertise: d.expertise,
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
    },

    getExpertiseDefaults(){
        var options = _.cloneDeep(OptionDefaults)
        return options.expertise;
    },

    toQueryParams(expertiseList, optionsList) {
        var urlParams = new URLSearchParams();
        Object.keys(expertiseList).forEach(function (v) {
            let slim = Number.parseInt(expertiseList[v].value / 100);
            if (slim !== 0) urlParams.append(expertiseList[v].queryParam, slim)
        })
        Object.keys(optionsList).forEach(function (v) {
            if (v === "level") {
                let slim = Number.parseInt(optionsList[v].value);
                if (slim !== 1) urlParams.append(optionsList[v].queryParam, slim)
            } else {
                let slim = Number.parseInt(optionsList[v].value / 1000);
                if (slim !== 0) urlParams.append(optionsList[v].queryParam, slim)
            }
        })
        return urlParams.toString();
    },
    fromQueryParams(url) {
        let ed = _.cloneDeep(ExpertiseDefaults)
        Object.keys(ed).forEach(function (item) {
            let queryValue = url.get(ed[item].queryParam)
            if (queryValue !== null) {
                let hydrated = Number.parseInt(queryValue) * 100
                ed[item].value = hydrated;
            }
        })

        let od = _.cloneDeep(OptionDefaults)
        Object.keys(od).forEach(function (item) {
            let queryValue = url.get(od[item].queryParam)
            if (queryValue !== null) {
                if (od[item].name === "Level") {
                    let hydrated = Number.parseInt(queryValue)
                    od[item].value = hydrated;
                } else {
                    let hydrated = Number.parseInt(queryValue) * 1000
                    od[item].value = hydrated;
                }
            }
        })

        var response = {
            expertise: ed,
            options: od
        }
        return response
    },
}