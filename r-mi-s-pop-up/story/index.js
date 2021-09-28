var input = ``;

var markov = {
    memory    : [],
    separator : '',
    order     : 2,
    maxSteps  : 200,
 
    learn : function (txt) {
        var mem = this.memory;
        this.breakText(txt, learnPart);
 
        function learnPart (key, value) {
            if (!mem[key]) {
                mem[key] = [];
            }
            mem[key].push(value);
 
            return mem;
        }
    },
 
    ask : function (seed) {
        if (!seed) {
            seed = this.genInitial();
            //console.log(this.genInitial());
        } 
 
        return seed.concat(this.step(seed, [], 0)).join(this.separator);
    },
 
    step : function (state, ret, count) {
        var nextAvailable = this.memory[state] || [''],
            next = nextAvailable.random();
            
        //we don't have anywhere to go
        //or we have run out of steps
        if (!next || count >= this.maxSteps) {
            return ret;
        } else {
            ret.push(next);
            var nextState = state.slice(1);
            nextState.push(next);
            count++;
            return this.step(nextState, ret, count);
        }    
    },
 
    breakText : function (txt, cb) {
        var parts = txt.split(this.separator),
            prev = this.genInitial();
 
        parts.forEach(step);
        cb(prev, '');
 
        function step (next) {
            cb(prev, next);
            prev.shift();
            prev.push(next);
        }
    },
 
    genInitial : function () {
        var ret = [];
 
        for (
            var i = 0;
            i < this.order;
            ret.push(''), i++
        );
 
        return ret;
    }
};
 
Array.prototype.random = function () {
    return this[Math.floor(Math.random() * this.length)];
};

markov.separator = ' '; 
markov.order = 3;
markov.learn(input);

function randomKey(obj) {
    var temp_key, keys = [];
    for(temp_key in obj) {
       if(obj.hasOwnProperty(temp_key)) {
           keys.push(temp_key); 
       }
    }
    var selectKey = keys[Math.floor(Math.random() * keys.length)];
    var splitKey = selectKey.split(',');
    var returnKey = [];
        returnKey.push(splitKey[0], splitKey[1], splitKey[2]); 
    
    console.log(returnKey);
    return returnKey;
}

/*
// simple typing effect 
// this does really weird stuff if you trigger it again before it's finished
function typeEffect(element, speed) {
	var text = $(element).text();
	$(element).html('');
	
	var i = 0;
	var timer = setInterval(function() {
					if (i < text.length) {
						$(element).append(text.charAt(i));
						i++;
					} else {
						clearInterval(timer);
					}
				}, speed);
}
  */
// ——————————————————————————————————————————————————
// TextScramble
// ——————————————————————————————————————————————————
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TextScramble = function () {
  function TextScramble(el) {
    _classCallCheck(this, TextScramble);

    this.el = el;
    this.chars = '∏∑Δ░ █▒░ █▓ ▀▄';
    this.update = this.update.bind(this);
  }

  TextScramble.prototype.setText = function setText(newText) {
    var _this = this;

    var oldText = this.el.innerText;
    var length = Math.max(oldText.length, newText.length);
    console.log(length);
    var promise = new Promise(function (resolve) {
      return _this.resolve = resolve;
    });
    this.queue = [];
    for (var i = 0; i < length; i++) {
      var from = oldText[i] || '';
      var to = newText[i] || '';
      var start = Math.floor(Math.random() * 40);
      var end = start + Math.floor(Math.random() * 40);
      this.queue.push({ from: from, to: to, start: start, end: end });
    }
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  };

  TextScramble.prototype.update = function update() {
    var output = '';
    var complete = 0;
    for (var i = 0, n = this.queue.length; i < n; i++) {
      var _queue$i = this.queue[i];
      var from = _queue$i.from;
      var to = _queue$i.to;
      var start = _queue$i.start;
      var end = _queue$i.end;
      var char = _queue$i.char;

      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += '<span class="enc">' + char + '</span>';
      } else {
        output += from;
      }
    }
    this.el.innerHTML = output;
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  };

  TextScramble.prototype.randomChar = function randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  };

  return TextScramble;
}();


function generate(target){
  var paragraph = "";
  var output = markov.ask(randomKey(markov.memory));
  var sentences = output.match( /[^\.!\?]+[\.!\?]+/g );
  if(sentences !== null){
     for (var i = 1; i < 3; i++) {
        paragraph += sentences[i] || "";
      }
      if(paragraph !== null || paragraph.trim() == ""){
        //$(target).html(paragraph);
        return paragraph;
      } else {
        // paragraph was empty so redo
        console.log("paragraph was empty so redo");
        paragraph = "Transmission incomplete. Please try again.";
        return paragraph;
        generate(target);
      }
    } else {
      // sentences was null so redo
      console.log("sentences was null so redo");
      paragraph = "Transmission incomplete. Please try again.";
      return paragraph;
      generate(target);
    }
}
var el = document.querySelector('#result');
var fx = new TextScramble(el);
$('#generate').on('click', function () {
    //$('#result').html(generate('#result'));
    fx.setText(generate('#result'));
    //typeEffect('#result', 25);
});
//Initialize 
//generate('#result');

