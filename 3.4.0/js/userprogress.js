var userProgress = {

    current: null,
    cleanOpts: {
        firstTime:true,
        score: 0,
        hintsUsed: 0,
        revealsUsed:0,
        lettersUsed:0,
        levelsCompleted: 0,
        lang:0,
        slowest: null,
        fastest: null,
        levelsData: {
            example: {   //example needs to be the number of the level
                completed: true, // or false

            }
        }
    },
    saveProgress: function () {
        localStorage.setItem("userProgress", JSON.stringify(this.current));
    },
    loadProgress: function () {
        var raw = localStorage.getItem("userProgress");
        if (raw)
            this.current= JSON.parse(raw);
        else this.current= $.extend({}, this.cleanOpts);
    }
}
