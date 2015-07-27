/*!
* @Author: wanghu www.billwang.xyz
* @Email:  371570273@qq.com
* @Date:   2015-07-27 11:00:27
*/

var caution = false

function setCookie(name, value, expires, path, domain, secure) {

	var curCookie = name + "=" + escape(value) +
	((expires) ? "; expires=" + expires.toGMTString() : "") +
	((path) ? "; path=" + path : "") +
	((domain) ? "; domain=" + domain : "") +
	((secure) ? "; secure" : "")

	if (!caution || (name + "=" + escape(value)).length <= 4000)
		document.cookie = curCookie

	else if (confirm("Cookie exceeds 4KB and will be cut!"))
		document.cookie = curCookie

}

function getCookie(name) {

	var prefix = name + "="
	var cookieStartIndex = document.cookie.indexOf(prefix)

	if (cookieStartIndex == -1)
		return null

	var cookieEndIndex = document.cookie.indexOf(";", cookieStartIndex + prefix.length)

	if (cookieEndIndex == -1)
		cookieEndIndex = document.cookie.length

	return (document.cookie.substring(cookieStartIndex + prefix.length, cookieEndIndex))

}

function deleteCookie(name, path, domain) {

	if (getCookie(name)) {
		document.cookie = name + "=" +
		((path) ? "; path=" + path : "") +
		((domain) ? "; domain=" + domain : "") +
		"; expires=Thu, 01-Jan-70 00:00:01 GMT"
	}
}

function fixDate(date) {

	var base = new Date(0)
	var skew = base.getTime()
	if (skew > 0)
		date.setTime(date.getTime() - skew)

}

var now = new Date()

fixDate(now)
now.setTime(now.getTime() + 365 * 24 * 60 * 60 * 1000)
var visits = getCookie("counter")

if (!visits)
	visits = 1

else
	visits = parseInt(visits) + 1

setCookie("counter", visits, now)


var app = {
    init: function(){
        this.initPage();
        this.loadPage();
        this.bindLinkJump();
    },
    initPage: function(){
        var page = $('.page'),
            body = $('body');
        if (page.hasClass('home-page')) {
            this.bindHomeEvent();
        }
        if (page.hasClass('post-page')) {
            setTimeout(function() {
                body.addClass('scrollable');
            }, 1500);
        }
    },
    loadPage: function(){
        var body = $('body'),
            value    = 0,
            interval = setInterval(function(){
                value++;
                if (document.readyState === "interactive" || document.readyState === "complete" || document.readyState === "Loaded") {
                    if (!body.hasClass('loading')) {
                        body.addClass('loading');
                    };
                };
                if (value >= 16) {
                    body.removeClass('loading');
                    body.addClass('loaded');
                    clearInterval(interval);
                };
            },50);
    },
    bindLinkJump: function(){
        var body = $('body'),
            a    = document.getElementsByTagName('a');
        $(a).bind('click', function(e){
            e.preventDefault();
            var self = $(this);
            var link = self.attr('href');
            if (self.attr('target')) {
                window.open(link);
            }else{
                body.removeClass('scrollable');
                body.removeClass('loaded');
                body.addClass('quiting');
                setTimeout(function() {
                    window.location.href = link;
                    clearTimeout();
                }, 800);
            }
        })
    },
    bindHomeEvent: function(){
        var homePage  = $('#homePage'),
            selectNav = $('#selectNav'),
            previewMini = $('.preview-mini'),
            data;

        // 事件绑定
        selectNav.find('li').bind('mouseenter', function(event) {
            homePage.spinClass($(this).attr('class'));
        });
        previewMini.bind('click', function(event) {
            data = $(this).attr('data-class');
            homePage.spinClass(data);
        });

        // 转盘class操作
        $.prototype.spinClass = function(_class) {
            $(this).removeClass('show-frontend');
            $(this).removeClass('show-design');
            $(this).removeClass('show-diary');
            $(this).addClass('show-' + _class);
        };
    }
}
