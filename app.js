$(document).ready(function() {

    $('.message').html('You have 5 sec to help <b>Python</b> catch <b>Ruby</b> by arrow keys');
    $('#start_over').hide();
    $('.form').hide();

    $('#start_game').on('click', function(){
        var i,j;
        $('.message').css({'font-size':'18px', 'color':'black'});
        $('.message').html('You have 5 sec to help <b>Python</b> catch <b>Ruby</b> by arrow keys');
        $('.form').remove();

        var render = function() {
            $('.viewport').css('display', 'table');
            var html = "";
            for(i=0; i<10; i++) {
                html += "<div class='row'>";
                for(j=0; j<10; j++) {
                    html += "<div class='game-space' id="+i+""+j+">";
                    if(i === 0 && j === 0 && $('#start_game').text() === 'Start Game') {
                        html += "<img src='python.png' height=45 width=45>";
                    }
                    html += "</div>";
                }
                html += "</div>";
            }
            $('.viewport').html(html);

            if ( $('#start_game').text() === 'Retry' ) {
                removeItem('python');
                setRandomPosition('python');
            }
        };

        var removeItem = function(e) {
            var pythonTileId = getCurrentPosition(e);
            $('#'+pythonTileId+' img').remove();
        };

        var setRandomPosition = function(e){
            var p=q=0;
            var tileId='';
            if (e === 'python') {

                p = Math.floor(Math.random() * 9  + 1);
                q = Math.floor(Math.random() * 9  + 1);

                tileId = p.toString() + q.toString();
                $('#'+tileId).prepend("<img src='python.png' height=45 width=45>");
            }

            if (e === 'ruby') {
                var m = n = 0;

                var PythonCurrentPosition = getCurrentPosition('python');

                p = parseInt(PythonCurrentPosition.substring(0,1));
                q = parseInt(PythonCurrentPosition.substring(1,2));
                console.log('p: ' + p + ' and q: ' + q);
                (p < 5) ? (m = Math.floor(Math.random() * (9-5)+1) + 5) : (m = Math.floor(Math.random() * 5+1));
                (q < 5) ? (n = Math.floor(Math.random() * (9-5)+1) + 5) : (n = Math.floor(Math.random() * 5+1));

                tileId = m.toString() + n.toString();
                $('#'+tileId).prepend("<img src='ruby.png' height=45 width=45>");
            }
        };

        var getCurrentPosition = function(e) {
            if (e === 'python'){
                var x = $("img[src$='python.png']").parent();
            }
            else if (e === 'ruby') {
                var x = $("img[src$='ruby.png']").parent();
            }
            return x.attr('id');
        };

        var counter = 0;
        var arrowKeyLocked = false;
        $(document).keyup(function(e) {
            if (!arrowKeyLocked) {
                var PythonCurrentPosition = getCurrentPosition('python');

                var i = PythonCurrentPosition.substring(0,1);
                var j = PythonCurrentPosition.substring(1,2);

                var pythonTileId;

                if(e.which === 38 && !arrowKeyLocked){
                    if ( i > 0){
                        pythonTileId = i.toString() + j.toString();
                        $('#'+pythonTileId+' img').remove();
                        i--;
                        counter ++;
                        pythonTileId = i.toString() + j.toString();
                        $('#'+pythonTileId).prepend("<img src='python.png' height=45 width=45>");
                    }
                }
                if(e.which === 40 && !arrowKeyLocked){
                    if ( i < 9){
                        pythonTileId = i.toString() + j.toString();
                        $('#'+pythonTileId+' img').remove();
                        i++;
                        counter ++;
                        pythonTileId = i.toString() + j.toString();
                        $('#'+pythonTileId).prepend("<img src='python.png' height=45 width=45>");
                    }
                }
                if(e.which === 37 && !arrowKeyLocked){
                    if ( j > 0){
                        pythonTileId = i.toString() + j.toString();
                        $('#'+pythonTileId+' img').remove();
                        j--;
                        counter ++;
                        pythonTileId = i.toString() + j.toString();
                        $('#'+pythonTileId).prepend("<img src='python.png' height=45 width=45>");
                    }
                }
                if(e.which === 39 && !arrowKeyLocked){
                    if ( j < 9) {
                        pythonTileId = i.toString() + j.toString();
                        $('#' + pythonTileId + ' img').remove();
                        j++;
                        counter++;
                        pythonTileId = i.toString() + j.toString();
                        $('#' + pythonTileId).prepend("<img src='python.png' height=45 width=45>");
                    }
                }
                $('#displayCounter').text('Total movement is :' + counter);

                setTimeout(showMessage, 1);
                function showMessage(){
                    if (pythonTileId === getCurrentPosition('ruby')){
                        $('#'+pythonTileId+' img').remove();

                        $('#'+pythonTileId).prepend("<img src='pythonWin.png' height=45 width=45>");


                        $('.message').css({'font-size':'30px', 'color':'blue'});
                        $('.message').text('Good job!');
                        arrowKeyLocked = true;
                        $('#start_game').hide();
                        $('#start_over').show();
                    }
                }
            }
        });

        var gameStart = function(){
            render();
            setRandomPosition('ruby');
            $('#start_game').prop('disabled', true);

            setTimeout(timeToPlay, 5000);
            function timeToPlay(){
                if (!arrowKeyLocked){
                    pythonTileId = getCurrentPosition('python');
                    removeItem('python');
                    $('#'+pythonTileId).prepend("<img src='pythonLose.png' height=45 width=45>").show('slow');

                    $('.message').css({'font-size':'30px', 'color':'red'});
                    $('.message').text('Game Over!');
                    $('#start_game').prop('disabled', false);
                    $('#start_game').html('Retry');
                    arrowKeyLocked = true;
                }
            }
        };
        gameStart();
    });

    $('#start_over').on('click', function(){
        location.reload();
    });

    $('#close_window').on('click', function () {
        window.close();
    });

});





