import baseURL from "@/services/url";

export default (imageUrl)=>{
  if(typeof imageUrl== 'string'){
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl;
    } else {
      return baseURL + imageUrl;
    }
  }

}
