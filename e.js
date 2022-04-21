projectAPI.greetUser = async function(p, param, callback) {
    p.play('Would you like me to give you a short overview of this month\'s statistics for your site?');
    
    const answer = await p.then(getYesNo);
    
    if (answer === 'yes') {
//         playStatistics(p);
    } else if (answer === 'no') {
        p.play('OK, never mind then.');
    } else {
        // Cancelled context.
    }

    callback(null, 'ok');
};


// Context that locks user into yes/no answer.
const getYesNo = context(() => {
    title('Statistics overview');
    
    intent('(yes|sure|please|yes please|ok)', p => p.resolve('yes'));
    intent('(no|nope|never|cancel)', p => p.resolve('no'));
    fallback('Please say yes or no if you would like to hear a short overview of statistics.');
});

projectAPI.clearContextGlobal = function(p, param, callback) {
    try {
        p.resolve('cancel'); // Cancel yes/no context if it was active.
    } catch (e) {}
    callback(null, 'ok');
}
