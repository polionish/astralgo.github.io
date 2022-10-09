let lps

// function drawRect(){
//     d3.selectAll("circle")
//         .transition().duration(2500)
//         .style("fill", "steelblue")
//         .attr("r", 15)
//         .transition().duration(1000)
//         .attr("cy", (height / 2))
//         .each(function (d, i) {
//             d3.select(this)
//                 .transition().duration(1000)
//                 .attr("cx", 30 + (i * width / 25));
//         });
// }

// function drawRect2() {
//     if (lps.length > 10) {
//         alert("lol");
//         clearTimeout(timerId);
//         return;
//     }
//     d3.select("body").select("svg").append("rect")
//         .attr("rx", getRandomInt())
//         .attr("ry", getRandomInt())
//         .attr("x", x += 10)
//         .attr("y", y)
//         .attr("width", 10)
//         .attr("height", 10)
//         .attr("stroke", "black")
//         .attr("fill", "white");
//
//     d3.select("body").select("svg").append("text")
//         .attr("x", x += 10)
//         .attr("y", y)
//         .attr("dy", ".35em")
//         .text(function (d) {
//             return "ok";
//         });
//
//     d3.select("body").select("svg").append("rect")
//         .attr("rx", 10)
//         .attr("ry", 10)
//         .attr("x", 110)
//         .attr("y", 110)
//         .attr("width", 10)
//         .attr("height", 10)
//         .attr("stroke", "black")
//         .attr("fill", "white");
//
//     d3.select("rect")
//         .transition()
//         .duration(1000)
//         .attr("rx", 0)
//         .attr("ry", 0)
//         .attr("fill", "pink");
// }
//
// function animatePrefFunAlgo() {
//     // drawRect2();
//     //  timerId = setInterval('drawRect2()', 1000);
//
// }

let x;
let y;
let timerId;
let txtLen;
let svgField = d3.select("body").select("svg");
let kolOfFigs = 0;
let txt;
let del;
var timeouts = [];

function calculatePrefFun() {
    let txtField = document.getElementById("pref-fun-input");
    txt = txtField.value;
    console.log(txt);
    lps = computeLPSArray(txt);
    console.log(lps);

    txtLen = txt.length;
    let result = "";
    for (let el in lps) {
        result += lps[el] + " ";
    }
    document.getElementById("pref-fun-output").textContent = result;
}

function stopTimeouts() {
    for (let i = 0; i < timeouts.length; ++i) {
        clearTimeout(timeouts[i]);
    }
}

function buildPrefixFunction() {
    stopTimeouts();
    timeouts = [];
    del = 1000;
    document.getElementById("pref-fun-logs").textContent = "История:";
    document.getElementById("pref-fun-last-log").textContent = "";

    txtField = document.getElementById("pref-fun-input");

    txt = txtField.value;

    if (txt.length === 0) {
        return;
    }

    if (txt.length > 15) {
        alert("Длина текста, на котором будет показана анимация работы префикс-функции, должна быть не более 15 символов \n У вас " + txt.length);
        clearTimeout(timerId);
        return;
    }

    x = 40;
    y = 100;
    kolOfFigs = 0;
    $("svg").empty();
    document.getElementById("animate_but").disabled = true;
    drawArray();

    lps = computeLPSArrayAndDraw(txt);
    txtLen = txt.length;
    let result = "";
    for (let el in lps) {
        result += lps[el] + " ";
    }
    document.getElementById("pref-fun-output").textContent = result;
}

function writeLog(log, n) {
    let spacePref = "    ";
    for (let i = 0; i < n; ++i) {
        spacePref += "    ";
    }
    document.getElementById("pref-fun-logs").textContent += "\n" + spacePref + log;
    document.getElementById("pref-fun-last-log").textContent = log;
}

function drawRect() {

    svgField.append("circle")
        .attr("cx", x)
        .attr("cy", y)
        .attr("r", 20)
        .attr("fill", "rgb(219,184,255)");

    d3.select("body").select("svg").append("text")
        .attr("x", x - 5)
        .attr("y", y - 35)
        .attr("dy", ".35em")
        .attr("font-size", "1rem")
        .text(function (d) {
            return kolOfFigs;
        });

    d3.select("body").select("svg").append("text")
        .attr("x", x - 5)
        .attr("y", y)
        .attr("dy", ".35em")
        .attr("font-size", "1rem")
        .text(function (d) {
            return txt[kolOfFigs++];
        });
    x += 50;

    if (kolOfFigs >= txtLen) {
        clearTimeout(timerId);
        document.getElementById("animate_but").disabled = false;
    }
}

function highlightCircle(i) {
    svgField.append("circle")
        .attr("cx", 40 + (i - 1) * 50)
        .attr("cy", y)
        .attr("r", 20)
        .attr("stroke-width", 3)
        .style("stroke", "rgb(255,0,135)")
        .attr("fill", "rgba(100,122,230,0)");
}

function writePrefFunVal(i) {
    d3.select("body").select("svg").append("text")
        .attr("x", 35 + (i) * 50)
        .attr("y", y + 35)
        .attr("dy", ".35em")
        .attr("font-size", "1rem")
        .text(function (d) {
            return lps[i];
        });
}

function deHighlightCircle(i) {
    svgField.append("circle")
        .attr("cx", 40 + (i - 1) * 50)
        .attr("cy", y)
        .attr("r", 20)
        .attr("stroke-width", 5)
        .style("stroke", "rgb(219,184,255)")
        .attr("fill", "rgba(100,122,230,0)");
}

function drawArray() {
    timerId = setInterval('drawRect()', 100);

    d3.select("body").select("svg").append("text")
        .attr("x", 35)
        .attr("y", y + 35)
        .attr("dy", ".35em")
        .attr("font-size", "1rem")
        .text(function (d) {
            return "0";
        });
}


function computeLPSArray(txt) {
    let M = txt.length;
    var len = 0;
    var i = 1;
    lps = [];
    lps[0] = 0; // lps[0] is always 0

    // the loop calculates lps[i] for i = 1 to M-1
    while (i < M) {
        if (txt.charAt(i) === txt.charAt(len)) {
            len++;
            lps[i] = len;
            i++;
        } else // (pat[i] != pat[len])
        {
            // This is tricky. Consider the example.
            // AAACAAAA and i = 7. The idea is similar
            // to search step.
            if (len != 0) {
                len = lps[len - 1];

                // Also, note that we do not increment
                // i here
            } else // if (len == 0)
            {
                lps[i] = len;
                i++;
            }
        }
    }
    console.log(lps[2]);
    return lps;
}


function computeLPSArrayAndDraw(txt) {
    let M = txt.length;
    let lps = [];
    let len = 0;
    let i = 1;
    lps[0] = 0;
    let indI = -1;

    while (i < M) {
        let indLen = len;
        (function () {
            let ii = i;
            let indII = indI;
            let lenn = len;
            if (indII != ii) {
                timeouts.push((setTimeout(function () {
                    writeLog("Считаем p[" + (ii) + "]", 1)
                }, del += 1000)));
                timeouts.push((setTimeout(function () {
                    highlightCircle(ii + 1)
                }, del)));
                timeouts.push((setTimeout(function () {
                    writeLog("Смотрим на p[" + (ii - 1) + "]", 2)
                }, del += 2000)));
                timeouts.push((setTimeout(function () {
                    writeLog("p[" + (ii - 1) + "]=" + lps[ii - 1], 2)
                }, del)));
                timeouts.push((setTimeout(function () {
                    highlightCircle(ii)
                }, del)));
            }

            else {
                timeouts.push((setTimeout(function () {
                    writeLog("Смотрим на p[" + (lenn) + "]", 2)
                }, del += 2000)));
                timeouts.push((setTimeout(function () {
                    writeLog("p[" + (lenn) + "]=" + lps[lenn], 2)
                }, del)));

                timeouts.push((setTimeout(function () {
                    deHighlightCircle(ii)
                }, del += 2000)));
                timeouts.push((setTimeout(function () {
                    highlightCircle(lenn + 1)
                }, del += 2000)));
            }
        })()

        indI = i;
        // alert(txt.charAt(i) === txt.charAt(len));
        if (txt.charAt(i) === txt.charAt(len)) {
            (function () {
                let ii = i;
                let lenn = len;
                let mess = txt.charAt(ii) + "=" + txt.charAt(lenn);
                timeouts.push((setTimeout(function () {
                    writeLog("str[" + (ii) + "]=str[" + lenn +"]", 2)
                }, del += 1000)));
                timeouts.push(setTimeout(function () {
                    writeLog(mess, 2)
                }, del += 1000));
                timeouts.push(setTimeout(function () {
                    writeLog("Значит, p[" + ii +"] = " + "p[" + lenn + "] + 1 = " + (lenn + 1), 2)
                }, del += 1000));
            })()
            len++;
            lps[i] = len;
            i++;
        } else // (pat[i] != pat[len])
        {
            let ii = i;
            let lenn = len;
            (function () {
                let mess = txt.charAt(ii) + "≠" + txt.charAt(lenn);
                timeouts.push((setTimeout(function () {
                    writeLog("str[" + (ii) + "]≠str[" + lenn +"]", 2)
                }, del)));
                timeouts.push(setTimeout(function () {
                    writeLog(mess, 2)
                }, del += 1000));
            })()            // This is tricky. Consider the example.
            // AAACAAAA and i = 7. The idea is similar
            // to search step.
            if (len !== 0) {
                (function () {
                    let ii = i;
                    let jj = len;

                    timeouts.push((setTimeout(function () {
                        deHighlightCircle(jj + 1)
                    }, del)));
                    //
                    // timeouts.push((setTimeout(function () {
                    //     highlightCircle(lps[jj-1]+1)
                    // }, del)));
                })()
                // = вывести текстовую инфу("не равны")
                len = lps[len - 1];

                // Also, note that we do not increment
                // i here
            } else // if (len == 0)
            {
                (function () {
                    let ii = i + 1;
                    let lenn = len;
                    timeouts.push((setTimeout(function () {
                        deHighlightCircle(lenn + 1)
                    }, del += 1000)));
                    timeouts.push(setTimeout(function () {
                        writeLog("Значит, p[" + ii +"] = " + 0, 2)
                    }, del += 1000));

                })();
                lps[i] = 0;
                i++;
            }
        }
        (function () {
            let ii = indI;
            let lenn = len;
            timeouts.push(setTimeout(function () {
                writePrefFunVal(ii)
            }, del += 1000));
            timeouts.push(setTimeout(function () {
                deHighlightCircle(ii)
            }, del += 1000));
            if (ii !== indI) {
                timeouts.push(setTimeout(function () {
                    deHighlightCircle(ii + 1)
                }, del));
            }
            timeouts.push(setTimeout(function () {
                deHighlightCircle(lenn + 1)
            }, del));
            // timeouts.push(setTimeout(function () {
            //     writePrefFunVal(indLen)
            // }, del));
        })();
    }
    return lps;
}
