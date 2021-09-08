let loudness;

$(document).ready(() => {
   
    // alert('Javascript loaded'); 

    $('#track_search').on('submit', (event) => {
        // results of song search on submit
        event.preventDefault();
        // default_display_state()
        // refresh with new search
        $('#search_results').empty(); 
        
        const data = { "name": $("#track_search_input").val() };

        $.post('/track_api.json', data, (response) => {
            // Loop through JSON response data from Spotify API
           
            console.log(response);
            // empty song search dict
            const track_data = {};

            for (const element of response) {

                $('#search_results').append(
                    // make id the value            
                    `<div>
                        <button  type="button"  name="select_song" id="${element.track_id}">
                        ${element.track_name}
                        </button>     
                        <label id="${element.track_uri}" for="${element.track_name}"> 
                        </label>       
                    </div>`);
                    
                    // toggle the hide and show class 
                    // empty list in html - set list in javascript 
                   
                
                    $(`#${element.track_id}`).on('click', () => {
                        console.log('hi im in here');
                            // default_display_state()
                            $('#search_results').hide(); 
                            $('#track_search').hide(); 
                            $('#mood-graphic').html('');
                            $.get(`/selectedTrack/${element.track_id}`, (res) =>{
                                console.log('now inside get request');
                                console.log(res);
                                $('#mood-graphic').append(
                                    // make id the value            
                                    `<div>
                                        <p">
                                        <p> Name: ${res.name} </p>
                                        <p> Artist: ${res.artist} </p>
                                        <p> Danceability: ${res.danceability} </p>
                                        <p> Energy: ${res.energy} </p>
                                        <p> Loudness: ${res.loudness} </p>
                                        <p> Tempo: ${res.tempo} </p>
                                        <p> Time_signature: ${res.time_signature} </p>
                                        </p>         
                                    </div>`);
                                    loudness = res.loudness
                                    // res should return dictionary
                                    // track = {'name':name, 'album':album, 'artist':artist, "danceability": danceability, "energy": energy, 'loudness': loudness, 'tempo': tempo, 'time_signature':time_signature}
                                    // pass dictionary into new rerender
                                    //update page => displaytrack.append 
                                //default display function so that it can be rewritte 

                                // add button and when clicked do the opposite hide 

                            });

                            //update project.html 
                    });
                

                    // function default_display_state() {
                    //    
                    // };

                // track_data[element.id] = {
                //     'track_name': element.name,
                //     'track_id': element.id
                // };
            }

        });

    });

    //      // sends selection to server
    // $('#search_results').on('submit', (event) => {
       
    //     //grabs song
    //     let selected_song_id = $('#search_results').serializeArray()[0].value;
        
    //     event.preventDefault();

    //    //empties search bar 
    //     $('#search_results').empty();
    //     // $('#track_search').empty();

    //     // grab id from serialzed array and lookup song info
    //     let post_song_data = song_data[selected_song_id];
    //     console.log(selected_song_id);

    // });

    // 
    // $('div.search_result').on('click', (event) =>{
    //     console.log("HIIIIIIIIIIIIIIIIIIIIIII");

    //     $.post("/selectedTrack/" + event.data("id"));
    //     console.log(event.data("id"));
    // });


});
        
