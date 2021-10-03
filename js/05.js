var that;
class Tab {
    constructor(id){
        // 获取元素
        this.main = document.querySelector(id);
        this.add = this.main.querySelector(".tabadd");

        // 动态获取元素（HTMLCollection）
        this.lis = this.main.getElementsByTagName("li");
        this.sections = this.main.getElementsByTagName("section");
        this.remove = this.main.getElementsByClassName("icon-guanbi");


        // li的父元素
        this.ul = this.main.querySelector(".first_nav ul:first-child");
        // section的父元素
        this.tabscon = this.main.querySelector(".tabscon");
        this.init();
        that = this;
    }
    init(){
        this.updateNode();
        // init 初始化操作让相关的元素绑定事件
        for(var i = 0;i < this.lis.length; i++ ){
            this.lis[i].index = i;
            this.lis[i].onclick = this.toggleTab;
            this.remove[i].onclick = this.removeTab;
            this.spans[i].ondblclick = this.editTab;
            this.sections[i].ondblclick = this.editTab;
        }

        this.add.onclick = this.addTab;

    }

    // 动态添加元素，需要重新获取元素（NodeList属于静态元素，必须手动重新获取元素）
    updateNode(){

    //     this.lis = this.main.querySelectorAll("li");
    //     this.sections = this.main.querySelectorAll("section");
    //     this.remove = this.main.querySelectorAll(".icon-guanbi");
        this.spans = this.main.querySelectorAll(".first_nav li span:first-child");
    }

    clearClass(){
        for(var i = 0; i < this.lis.length; i++){
            this.lis[i].className ='';
            this.sections[i].className ='';
        }
    }

    // 切换功能
    toggleTab(){
        that.clearClass();
        this.className = 'current';
        // console.log(this.index);
        that.sections[this.index].className = 'conactive';

    }
    // 添加功能
    addTab(){
        that.clearClass();
        // （1）创建li元素和section元素
        var li = '<li class="current"><span>新选项卡</span><span class="iconfont icon-guanbi"></span></li>';
        var section = '<section class="conactive">新的内容</section>';

        // （2）把这2个元素追加到对应的父元素里面
        that.ul.insertAdjacentHTML('beforeend', li);
        that.tabscon.insertAdjacentHTML('beforeend', section);
        that.init();

    }
    // 删除功能
    removeTab(e){
        e.stopPropagation();  // 阻止事件冒泡 防止li的切换点击事件
        var index = this.parentNode.index;  // HTML DOM 元素
        console.log(index);
        // 根据索引号删除对应的li和section。 remove()方法可以直接删除指定元素
        that.lis[index].remove();
        that.sections[index].remove();
        that.init();

        // 当删除的不是选中状态的li，保持原来选中状态
        if(document.querySelector(".current")) return;

        // 当删除的是选中状态的li，手动调用点击事件让前一位处于选定状态
        // 当前面为真时，执行后面
        that.lis[--index] && that.lis[index].onclick();

    }
    // 修改功能
    editTab(){
        var str = this.innerText;
        // 双击禁止选定的文字
        window.getSelection ? window.getSelection().removeAllRanges() : document.getSelection.empty();
        this.innerHTML = '<input type="text">';
        var input = this.children[0];
        input.value = str;
        input.select();  // 文本框里面的文字处于选定状态

        // 当离开文本框就把文本框里面的值给span
        input.onblur = function(){
            this.parentNode.innerHTML = this.value;
        }
        // 按下回车也可以把文本框里面的值给span
        input.onkeyup = function(e){
            if(e.keyCode === 13){
                this.blur();
            }
        }

    }

}

new Tab('#tab');



// element.insertAdjacentHTML(position, text);  父元素插入元素（字符串格式）
// position: 
    // (1) beforebegin: 元素自身之前。
    // (2) afterbegin： 元素内部第一个子节点之前。
    // (3) beforeend: 元素内部最后一个子节点之后。
    // (4) afterend: 元素自身之后。

// vs. appendChild必须先createElement之后才能添加元素
