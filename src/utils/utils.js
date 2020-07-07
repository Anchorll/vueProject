export const replaceAllImg = (html) => {

    var newContent = html.replace(/<img[^>]*>/gi, function(str, capture) {

        console.log('==', str);

        var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;

        var url = str.match(srcReg);

        console.log(url[1]);

        var mat = str.replace(/src=\"(.*)\"/gi, 'data-src=' + url[1]);
        console.log("mat",mat)
        return mat;

    });
    console.log(newContent)
    return newContent;

};
export function setCookies(name,value,days){

      var d = new Date;

      d.setTime(d.getTime() + 24*60*60*1000*days);

      window.document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
}
export function getCookies(name) {

    var v = window.document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');

    return v ? v[2] : null;

}

export function deleteCookies(name) {

    this.setCookies(name, '', -1);

}
