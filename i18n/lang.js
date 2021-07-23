

 var demoJson = {
	"demo": {
    "nav": {
		"home": {
			"vi": "Trang chủ",
			"en": "Home",
		},
        "about": {
			"vi": "Tiểu sử",
			"en": "About",
		},
        "service": {
			"vi": "Chuyên môn",
			"en": "Service",
		},
        "portfolio": {
			"vi": "Hồ sơ",
			"en": "Portfolio",
		},
        "experience": {
			"vi": "Kinh nghiệm",
			"en": "Experience",
		},
        "contact": {
			"vi": "Liên hệ",
			"en": "Contact",
		},
    },
		"title": {
			"vi": "Nguyễn Ngô Anh Tuấn",
			"en": "Nguyen Ngo Anh Tuan",
		},
		"text": {
			"vi": "Lập trình viên Java | Thiết kế Database/UI",
			"en": "Java Developer | UI/Database Designer",
		},
		"form": {
			"name": {
				"vi": "Nhập tên của bạn...",
				"en": "Enter your name...",
			},
			"email": {
				"vi": "Nhập email của bạn...",
				"en": "Enter your email...",
			},
			"submit": {
				"vi": "Gửi",
				"en": "Send",
			}
		},
        "project":{
	    "name": {
		"vi": "Website thời trang Sunrise",
		"en": "Sunrise Shop Website",
		    },
            "text": {
                "vi": "Lập trình viên Java | Thiết kế Database/UI",
                "en": "Java Developer | UI/Database Designer",
            },
        },
	"experience":{
		"heading": {
		"vi": "Công việc trong quá khứ và hiện tại",
		"en": "Past and current jobs",
		    },
		"title": {
			"vi": "Tôi đã học để trở thành một kỹ sư phát triển phần mềm chủ yếu tập trung vào bề mặt dưới, tức là phát triển Java với Spring framework. Nó cũng bao gồm các loại cơ sở dữ liệu.",
			"en": "I has learnt to become a software engineer primarily focussing on backend i.e. Java Development with spring framework. It also includes database operations.",
		},
		"text": {
                "vi": "Lập trình viên Java | Thiết kế Database/UI",
                "en": "Java Developer | UI/Database Designer",
            },
	}

	}
};

(function () {
	this.I18n = function (defaultLang) {
		var lang = defaultLang || 'en';
		this.language = lang;

		(function (i18n) {
			i18n.contents = demoJson;
			i18n.contents.prop = function (key) {
				var result = this;
				var keyArr = key.split('.');
				for (var index = 0; index < keyArr.length; index++) {
					var prop = keyArr[index];
					result = result[prop];
				}
				return result;
			};
			i18n.localize();
		})(this);
	};

	this.I18n.prototype.hasCachedContents = function () {
		return this.contents !== undefined;
	};

	this.I18n.prototype.lang = function (lang) {
		if (typeof lang === 'string') {
			this.language = lang;
		}
		this.localize();
		return this.language;
	};

	this.I18n.prototype.localize = function () {
		var contents = this.contents;
		if (!this.hasCachedContents()) {
			return;
		}
		var dfs = function (node, keys, results) {
			var isLeaf = function (node) {
				for (var prop in node) {
					if (node.hasOwnProperty(prop)) {
						if (typeof node[prop] === 'string') {
							return true;
						}
					}
				}
			}
			for (var prop in node) {
				if (node.hasOwnProperty(prop) && typeof node[prop] === 'object') {
					var myKey = keys.slice();
					myKey.push(prop);
					if (isLeaf(node[prop])) {
						//results.push(myKey.reduce((prev, current) => prev + '.' + current));	//not supported in older mobile broweser
						results.push(myKey.reduce( function (previousValue, currentValue, currentIndex, array) {
							return previousValue + '.' + currentValue;
						}));
					} else {
						dfs(node[prop], myKey, results);
					}
				}
			}
			return results;
		};
		var keys = dfs(contents, [], []);
		for (var index = 0; index < keys.length; index++) {
			var key = keys[index];
			if (contents.prop(key).hasOwnProperty(this.language)) {
				$('[data-i18n="'+key+'"]').text(contents.prop(key)[this.language]);
				$('[data-i18n-placeholder="'+key+'"]').attr('placeholder', contents.prop(key)[this.language]);
				$('[data-i18n-value="'+key+'"]').attr('value', contents.prop(key)[this.language]);
			} else {
				$('[data-i18n="'+key+'"]').text(contents.prop(key)['en']);
				$('[data-i18n-placeholder="'+key+'"]').attr('placeholder', contents.prop(key)['en']);
				$('[data-i18n-value="'+key+'"]').attr('value', contents.prop(key)['en']);
			}
		}
	};

}).apply(window);

$( document ).ready( function () {

	var i18n = new I18n();
	i18n.localize();
	$('.lang-picker #english').addClass('selected');
	
	$('.lang-picker #vietnamese').on('click', function () {
		i18n.lang('vi');
		selectLang($(this));
	})
	$('.lang-picker #english').on('click', function () {
		i18n.lang('en');
		selectLang($(this));
	})

	function selectLang (picker) {
		$('.lang-picker li').removeClass('selected');
		picker.addClass('selected');
	}
});
