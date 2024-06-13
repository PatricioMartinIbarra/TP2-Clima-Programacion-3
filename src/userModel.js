const mongoose = require('mongoose');
const userSchema = new mongoose.Schema(
    {
        location: {
            name: { type: string},
            region: { type: string},
            country: { type: string},
            lat: { type: number},
            lon: { type: number},
            tz_id: { type: string},
            localtime_epoch: { type: number},
            localtime: { type: string}
        },
        current: {
            last_updated_epoch: { type: number},
            last_updated: { type: string},
            temp_c: { type: number},
            temp_f: { type: number},
            is_day: { type: number},
            condition: {
                text: { type: string},
                icon: { type: string},
                code: { type: number}
            },
            wind_mph: { type: number},
            wind_kph: { type: number},
            wind_degree: { type: number},
            wind_dir: { type: string},
            pressure_mb: { type: number},
            pressure_in: { type: number},
            precip_mm: { type: number},
            precip_in: { type: number},
            humidity: { type: number},
            cloud: { type: number},
            feelslike_c: { type: number},
            feelslike_f: { type: number},
            windchill_c: { type: number},
            windchill_f: { type: number},
            heatindex_c: { type: number},
            heatindex_f: { type: number},
            dewpoint_c: { type: number},
            dewpoint_f: { type: number},
            vis_km: { type: number},
            vis_miles: { type: number},
            uv: { type: number},
            gust_mph: { type: number},
            gust_kph: { type: number}
        }
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

const ModelUser = mongoose.model("informacion", userSchema);
module.exports = ModelUser;

//Todo esto va en el Body en Json osea (Json CONTENT) en el thunder client?-----------------------------------------------------

//{
    //"location": {
      //"name": "",
      //"region": "",
      // "country": "",
     // "lat": 0,
     // "lon": 0,
     // "tz_id": "",
     // "localtime_epoch": 0,
      //"localtime": ""
    //},
   // "current": {
      //"last_updated_epoch": 0,
      //"last_updated": "",
      //"temp_c": 0,
      //"temp_f": 0,
      //"is_day": 0,
      //"condition": {
      //"text": "",
        //"icon": "",
        //"code": 0
      //},
      //"wind_mph": 0,
      //"wind_kph": 0,
      //"wind_degree": 0,
      //"wind_dir": "",
      //"pressure_mb": 0,
      //"pressure_in": 0,
      //"precip_mm": 0,
      //"precip_in": 0,
      //"humidity": 0,
      //"cloud": 0,
      //"feelslike_c": 0,
      //"feelslike_f": 0,
      //"windchill_c": 0,
      //"windchill_f": 0,
      //"heatindex_c": 0,
      //"heatindex_f": 0,
      //"dewpoint_c": 0,
      //"dewpoint_f": 0,
      //"vis_km": 0,
      //"vis_miles": 0,
      //"uv": 0,
      //"gust_mph": 0,
      //"gust_kph": 0
    //}
  //}