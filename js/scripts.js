(function ($, window, document) {
    $(function () {

        const url = "amounts.json";
        const mutableValues = $('ul.details-list').children('li').children('span[data-name]');

        loadAmountsData(url);

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

            mutableValues.html('<span class="loader"></span>');

            refreshed = true;

            loadAmountsData(url);
        });

        $('#account_details').on('click', function(e) {
            e.stopPropagation();
        });


        $('#incognitoSwitch').on('click', function() {
            modeIncognito = !modeIncognito;

            if (modeIncognito) {
                $(this).prop("checked");

                myStorage.setItem('amounts', 'visible');
            }

            else {
                myStorage.removeItem('amounts');
            }

            showHideAmounts(mutableValues, modeIncognito);
        });
        
        if (myStorage.getItem('amounts') === 'visible') {
            modeIncognito = true;
            $('#incognitoSwitch').prop('checked', 'checked');
        }
        
        else {
            modeIncognito = false;
            $('#incognitoSwitch').prop('checked', false);
        }

        showHideAmounts(mutableValues, modeIncognito);
    });
    // document ready

    let modeIncognito;
    let refreshed = false;

    const myStorage = window.localStorage;

    const maxBonusAmount = 100;
    const depositValues = [160, 250, 125, 840, 400, 50];
    const userNames = ["Jim", "George", "Anastasia", "Chris", "Sadie", "Vicky"];
    const currency = "€";

    const loadAmountsData = (url) => {
        $.ajax({
            type: 'GET',
            url: url,
        })
        .done(function(data) {
            renderUserData(data);
        })
        .fail(function() {
            $('ul.details-list').children('li').children('span[data-name]').html('');
            $('#account_details').append('<span class="error-overlay">Something went wrong. Please refresh your browser</span>')
        });
    }

    const renderUserData = (response) => {
        // Better not directly modify initial object,
        // it has to be mutated instead.
        const jsonObj = {
            ...response
        }

        const userObj = jsonObj['usersData'];
        
        let bonusLocked = true;
        let unlockValue;
        let username;
        let depositValue;
        let wageredValue;

        if (!refreshed) {
            depositValue = 100;
            wageredValue = userObj['wagered'];
            username = userObj['name'];
        }

        else {
            username = userNames[Math.floor(Math.random() * userNames.length)];
            depositValue = depositValues[Math.floor(Math.random() * depositValues.length)];
            wageredValue = Math.floor(Math.random() * Math.floor(depositValue));

            // set a random user name on each refresh
            userObj.user = username;
            
            // Set a random number for user's deposit,
            // and a random number for user's wagering as well.
            userObj.amountDeposit = depositValue;
            userObj.wagered = wageredValue;

            // Check if the amount that the user deposit is up to 100 euros,
            // in order to apply a bonus equal to the deposit.
            if (depositValue <= maxBonusAmount) {
                userObj['bonusAmount'] = depositValue;
            }

            else {
                userObj['bonusAmount'] =  100;
            }

            const bonusValue = userObj['bonusAmount'];

            const totalAmountForBet = depositValue + bonusValue;
            const unlockLimit = totalAmountForBet * 5;

            if (bonusValue > wageredValue) {
                unlockValue = bonusValue - wageredValue;
            }

            else {
                unlockValue = 0;
                bonusLocked = false;
            }
            
            userObj.balanceForUnlock = unlockValue;
            userObj.bonusBalance = unlockLimit - wageredValue;
        }

        if (bonusLocked) {
            $('#bonusIndicator').html('BONUS <span class="indicator">LOCKED</span>');
        }

        else {
            $('#bonusIndicator').children('.indicator').remove();
        }

        $('#bonus_progress').attr('value', parseInt(wageredValue));

        const mutableItems = $('ul.details-list').children('li').children('.details-list__value');

        mutableItems.each(function(index, elem) {
            let propKey = $(elem).data('name');
            let propValue = userObj[propKey];

            $(elem).html(propValue + currency);
        });

        $('.user-basic-info').children('span[data-name]').html(username);
        $('.amount-text').html(depositValue + currency);
    }

    const showHideAmounts = (selector, state) => {
        let visibility = '';

        if (state == true) {
            visibility = 'hidden';
        }
        
        else {
            visibility = 'visible';
        }

        selector.css('visibility', visibility);
    }

}(window.jQuery, window, document))