import request from "./request";


export function getData(){
      return request.get({
            url: "/powerscreen"
        })
}