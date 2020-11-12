
(function ($, window, document) {
    $(function () {

        var url = "https://raw.githubusercontent.com/DimLeon/header-layout/3a890cc7cc101b831b13e3ec83f5e23a186a2bca/js/amounts.json?token=AG3YBPA75RV5R45IZFBH3PK7VTXDG";

        // $.ajax({
        //     type: 'GET',
        //     url: url,
        //     // dataType: 'jsonp',  //use jsonp data type in order to perform cross domain ajax
        // })
        // .done(function(data) {
        //     console.log(data);
        // })
        // .fail(function(e) {
        //     console.log(e);
        // });


        // $.getJSON(url, function(data){
        //     console.log(data);
        // }).fail(function(){
        //     console.log("An error has occurred.");
        // });

        $('#balanceHandler').on('click', function(e) {
            const dropdown = $(this).children('#account_details');
            const self = $(this);

            dropdown.toggle();

            if (dropdown.is(":visible")) {
                self.addClass('active');

                barWidth = $('.bonus__progress-bar').width();
            }
            
            else {
                self.removeClass('active');
            }
        });

        $('#refresh_amounts').on('click', function(e) {
            e.stopPropagation();

            loadAmountsData();            
        });
    });
    // document ready

    let barWidth;

    const jsonObj = {
        "user":                 "Jim",
        "betAvailable":         "1590.00",
        "withdrawAvailable":    "1590.00",
        "openBets":             "200.00",
        "points":               "8260"
    }

    const depositValues = [160, 250, 125, 840, 400, 50];


    function loadAmountsData() {
        const maxBonusAmount = 100;
        const amountsObj = jsonObj;
        let bonusLocked = true;
        let unlockValue;

        const depositValue = depositValues[Math.floor(Math.random() * depositValues.length)];
        const wageredValue = Math.floor(Math.random() * Math.floor(depositValue));

        // No need to modify initial object,
        // it has to be mutated instead.
        const newAmountsObj = {
            ...amountsObj
        }

        // Set a random number for user's deposit,
        // and a random number for user's wagering as well.
        newAmountsObj.amountDeposit = depositValue;
        newAmountsObj.wagered = wageredValue;

        
        // Check if the amount that the user deposit is up to 100 euros,
        // in order to apply a bonus equal to the deposit.
        if (depositValue <= maxBonusAmount) {
            newAmountsObj['bonusAmount'] = depositValue;
        }

        else {
            newAmountsObj['bonusAmount'] =  100;
        }

        const bonusValue = newAmountsObj['bonusAmount'];

        const totalAmountForBet = depositValue + bonusValue;
        const unlockLimit = totalAmountForBet * 5;

        if (bonusValue > wageredValue) {
            unlockValue = bonusValue - wageredValue;
        }

        else {
            unlockValue = 0;
            bonusLocked = false;
        }
        
        newAmountsObj.balanceForUnlock = unlockValue;
        newAmountsObj.bonusBalance = unlockLimit - wageredValue;

        console.log(bonusLocked);
        console.log('i deposit '+ depositValue);
        console.log('my bonus is '+ bonusValue);
        console.log('i will bet '+ wageredValue);

        console.log(barWidth);

        const lockPosition = Math.ceil((barWidth/unlockLimit) * bonusValue);

        console.log(lockPosition);

        const mutableItems = $('ul.details-list').children('li').children('.details-list__value');

        mutableItems.each(function(index, elem) {
            var propKey = $(elem).data('name');
            var propValue = newAmountsObj[propKey];

            console.log(propKey,propValue);

            $(elem).html(propValue);
        });
    }

}(window.jQuery, window, document))