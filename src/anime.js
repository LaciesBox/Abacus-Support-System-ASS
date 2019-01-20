import anime from 'animejs'

export function showSearch(element) {
    anime({
        targets: element,
        translateX: ['229px', '0'],
        opacity: ['0', '1'],
        width: ['0', '100%'],
        duration: 1500,
        elasticity: 0,
    });
}

export function hideSearch(element) {
    anime({
        targets: element,
        translateX: ['0', '229px'],
        opacity: ['1', '0'],
        width: ['100%', '0'],
        duration: 1500,
        elasticity: 0,
    });
}

export function sendOffscreenUp(element) {
    anime({
        targets: element,
        translateY: -1000,
        opacity: 0,
        duration: 250,
        easing: 'easeInOutQuad'
    });
}

export function shrinkToolbar(element) {
    anime({
        targets: element,
        height: '4em',
        duration: 1500,
        easing: 'easeInOutQuad'
    });
}

export function shrinkToolbarLabel(element) {
    anime({
        targets: element,
        fontSize: 40,
        duration: 1500,
        easing: 'easeInOutQuad'
    });
}

export function fadeIn(element) {
    anime({
        targets: element,
        opacity: 0,
        duration: 250,
        easing: 'easeInOutQuad'
    });
}

export function fadeOut(element) {
    anime({
        targets: element,
        opacity: 1,
        duration: 250,
        easing: 'easeInOutQuad'
    });
}

export function rollDice(element) {
    anime({
        targets: element,
        rotate:{
            value: ['0', '+=540'],
            duration: '1000',
            easing: 'easeInOutSine'
        }
    });
}

export function rollNumber(resultElement, rollResult, callback) {
    anime({
        targets: resultElement,
        roll: rollResult.roll,
        finalRoll: rollResult.finalRoll,
        chanceOfDying: rollResult.chanceOfDying,
        easing: 'easeOutExpo',
        round: 1,
        duration: 1000,
        complete: callback
    });
}

export function rotatePlus(element) {
    anime({
        targets: element,
        rotate:{
            value: ['+=45'],
            duration: '300'
        }
    });
}

export function showSpeech() {
    anime.timeline()
    .add({
        targets: '.speech',
        translateY: ["1.1em", 0],
        translateX: ["0.55em", 0],
        translateZ: 0,
        opacity: 1,
        rotateZ: [180, 0],
        duration: 500,
        easing: "easeOutExpo",
        delay: function(el, i) {
        return 50 * i;
        }
    }).add({
        targets: '.speech',
        opacity: 0,
        duration: 500,
        easing: "easeOutExpo",
        delay: 1000
    });
}