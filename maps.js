var locations = [{lat:20.593684,lng:78.96288},{lat:28.3739976,lng:75.59696809999999}];
      function initMap() {
        var uluru = {lat:20.593684,lng:78.96288};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 10,
          center: uluru
        });
        for(i=0;i<locations.length;i++){
          var marker = new google.maps.Marker({
          position: locations[i],
          map: map
        });
        }
        
      } 

    
