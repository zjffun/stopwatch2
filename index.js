(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.stopwatch = factory());
}(this, (function () { 'use strict';

  var isNode = new Function("try {return this===global;}catch(e){return false;}");
  var isBrowser = new Function(
    "try {return this===self;}catch(e){ return false;}"
  );

  function stopwatch(globalName) {
    let _performance = null,
      _global = null;

    if (isNode()) {
      _performance = require("perf_hooks").performance;
      _global = global;
    } else if (isBrowser()) {
      _performance = performance;
      _global = self;
    } else {
      console.error(`unknow environment!`);
      return false;
    }

    if (_global[globalName]) {
      console.error(`"${globalName}" already exist in global!`);
      return false;
    }

    const players = Symbol("players");
    const states = {
      start: Symbol("start"),
      pause: Symbol("pause"),
      stop: Symbol("stop")
    };

    const stopwatch = (_global[globalName] = {
      [players]: {},
      start(tag) {
        if (!stopwatch[players][tag]) {
          stopwatch[players][tag] = {
            start: _performance.now(),
            execTime: 0,
            state: states.start
          };
          return;
        }
        const player = stopwatch[players][tag];

        if (player.state === states.stop) {
          player.execTime = 0;
        }
        player.start = _performance.now();
        player.state = states.start;
      },
      pause(tag) {
        if (!stopwatch[players][tag]) {
          console.error(`"${tag}" does not exist`);
          return;
        }

        const player = stopwatch[players][tag];

        let runTime = 0;
        if (player.state === states.start) {
          runTime = _performance.now() - player.start;
          player.execTime += runTime;
        }
        player.state === states.pause;

        return runTime;
      },
      stop(tag) {
        if (!stopwatch[players][tag]) {
          console.error(`"${tag}" does not exist`);
          return;
        }

        const player = stopwatch[players][tag];
        stopwatch.pause("tag");
        player.state = states.stop;
        console.log(`${tag}: ${player.execTime}ms`);
        return player.execTime;
      },
      sleep(ms) {
        const start = Date.now();
        while (Date.now() - start < ms) {}
      },
      list() {
        const copy = JSON.parse(JSON.stringify(stopwatch[players]));
        console.log(copy);
        return copy;
      },
      clear() {
        stopwatch[players] = {};
        return true;
      }
    });

    return true;
  }

  return stopwatch;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbInNyYy9zdG9wd2F0Y2guanMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIGlzTm9kZSA9IG5ldyBGdW5jdGlvbihcInRyeSB7cmV0dXJuIHRoaXM9PT1nbG9iYWw7fWNhdGNoKGUpe3JldHVybiBmYWxzZTt9XCIpO1xyXG52YXIgaXNCcm93c2VyID0gbmV3IEZ1bmN0aW9uKFxyXG4gIFwidHJ5IHtyZXR1cm4gdGhpcz09PXNlbGY7fWNhdGNoKGUpeyByZXR1cm4gZmFsc2U7fVwiXHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihnbG9iYWxOYW1lKSB7XHJcbiAgbGV0IF9wZXJmb3JtYW5jZSA9IG51bGwsXHJcbiAgICBfZ2xvYmFsID0gbnVsbDtcclxuXHJcbiAgaWYgKGlzTm9kZSgpKSB7XHJcbiAgICBfcGVyZm9ybWFuY2UgPSByZXF1aXJlKFwicGVyZl9ob29rc1wiKS5wZXJmb3JtYW5jZTtcclxuICAgIF9nbG9iYWwgPSBnbG9iYWw7XHJcbiAgfSBlbHNlIGlmIChpc0Jyb3dzZXIoKSkge1xyXG4gICAgX3BlcmZvcm1hbmNlID0gcGVyZm9ybWFuY2U7XHJcbiAgICBfZ2xvYmFsID0gc2VsZjtcclxuICB9IGVsc2Uge1xyXG4gICAgY29uc29sZS5lcnJvcihgdW5rbm93IGVudmlyb25tZW50IWApO1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgaWYgKF9nbG9iYWxbZ2xvYmFsTmFtZV0pIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoYFwiJHtnbG9iYWxOYW1lfVwiIGFscmVhZHkgZXhpc3QgaW4gZ2xvYmFsIWApO1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgcGxheWVycyA9IFN5bWJvbChcInBsYXllcnNcIik7XHJcbiAgY29uc3Qgc3RhdGVzID0ge1xyXG4gICAgc3RhcnQ6IFN5bWJvbChcInN0YXJ0XCIpLFxyXG4gICAgcGF1c2U6IFN5bWJvbChcInBhdXNlXCIpLFxyXG4gICAgc3RvcDogU3ltYm9sKFwic3RvcFwiKVxyXG4gIH07XHJcblxyXG4gIGNvbnN0IHN0b3B3YXRjaCA9IChfZ2xvYmFsW2dsb2JhbE5hbWVdID0ge1xyXG4gICAgW3BsYXllcnNdOiB7fSxcclxuICAgIHN0YXJ0KHRhZykge1xyXG4gICAgICBpZiAoIXN0b3B3YXRjaFtwbGF5ZXJzXVt0YWddKSB7XHJcbiAgICAgICAgc3RvcHdhdGNoW3BsYXllcnNdW3RhZ10gPSB7XHJcbiAgICAgICAgICBzdGFydDogX3BlcmZvcm1hbmNlLm5vdygpLFxyXG4gICAgICAgICAgZXhlY1RpbWU6IDAsXHJcbiAgICAgICAgICBzdGF0ZTogc3RhdGVzLnN0YXJ0XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgcGxheWVyID0gc3RvcHdhdGNoW3BsYXllcnNdW3RhZ107XHJcblxyXG4gICAgICBpZiAocGxheWVyLnN0YXRlID09PSBzdGF0ZXMuc3RvcCkge1xyXG4gICAgICAgIHBsYXllci5leGVjVGltZSA9IDA7XHJcbiAgICAgIH1cclxuICAgICAgcGxheWVyLnN0YXJ0ID0gX3BlcmZvcm1hbmNlLm5vdygpO1xyXG4gICAgICBwbGF5ZXIuc3RhdGUgPSBzdGF0ZXMuc3RhcnQ7XHJcbiAgICB9LFxyXG4gICAgcGF1c2UodGFnKSB7XHJcbiAgICAgIGlmICghc3RvcHdhdGNoW3BsYXllcnNdW3RhZ10pIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKGBcIiR7dGFnfVwiIGRvZXMgbm90IGV4aXN0YCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBwbGF5ZXIgPSBzdG9wd2F0Y2hbcGxheWVyc11bdGFnXTtcclxuXHJcbiAgICAgIGxldCBydW5UaW1lID0gMDtcclxuICAgICAgaWYgKHBsYXllci5zdGF0ZSA9PT0gc3RhdGVzLnN0YXJ0KSB7XHJcbiAgICAgICAgcnVuVGltZSA9IF9wZXJmb3JtYW5jZS5ub3coKSAtIHBsYXllci5zdGFydDtcclxuICAgICAgICBwbGF5ZXIuZXhlY1RpbWUgKz0gcnVuVGltZTtcclxuICAgICAgfVxyXG4gICAgICBwbGF5ZXIuc3RhdGUgPT09IHN0YXRlcy5wYXVzZTtcclxuXHJcbiAgICAgIHJldHVybiBydW5UaW1lO1xyXG4gICAgfSxcclxuICAgIHN0b3AodGFnKSB7XHJcbiAgICAgIGlmICghc3RvcHdhdGNoW3BsYXllcnNdW3RhZ10pIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKGBcIiR7dGFnfVwiIGRvZXMgbm90IGV4aXN0YCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBwbGF5ZXIgPSBzdG9wd2F0Y2hbcGxheWVyc11bdGFnXTtcclxuICAgICAgc3RvcHdhdGNoLnBhdXNlKFwidGFnXCIpO1xyXG4gICAgICBwbGF5ZXIuc3RhdGUgPSBzdGF0ZXMuc3RvcDtcclxuICAgICAgY29uc29sZS5sb2coYCR7dGFnfTogJHtwbGF5ZXIuZXhlY1RpbWV9bXNgKTtcclxuICAgICAgcmV0dXJuIHBsYXllci5leGVjVGltZTtcclxuICAgIH0sXHJcbiAgICBzbGVlcChtcykge1xyXG4gICAgICBjb25zdCBzdGFydCA9IERhdGUubm93KCk7XHJcbiAgICAgIHdoaWxlIChEYXRlLm5vdygpIC0gc3RhcnQgPCBtcykge31cclxuICAgIH0sXHJcbiAgICBsaXN0KCkge1xyXG4gICAgICBjb25zdCBjb3B5ID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShzdG9wd2F0Y2hbcGxheWVyc10pKTtcclxuICAgICAgY29uc29sZS5sb2coY29weSk7XHJcbiAgICAgIHJldHVybiBjb3B5O1xyXG4gICAgfSxcclxuICAgIGNsZWFyKCkge1xyXG4gICAgICBzdG9wd2F0Y2hbcGxheWVyc10gPSB7fTtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiB0cnVlO1xyXG59XHJc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
