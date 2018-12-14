	var tblUsers = document.getElementById('tbl_data');
	var databaseRef = firebase.database().ref('pengguna/');
	var rowIndex = 1;
  
  databaseRef.once('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
   var childKey = childSnapshot.key;
   var childData = childSnapshot.val();
   
   var row = tblUsers.insertRow(rowIndex);
   var cellId = row.insertCell(0);
   var cellName = row.insertCell(1);
   var cellPass = row.insertCell(2);
   var cellUbah = row.insertCell(3);
   var cellHapus = row.insertCell(3);

   cellId.appendChild(document.createTextNode(childKey));
   cellName.appendChild(document.createTextNode(childData.username));
   cellPass.appendChild(document.createTextNode(childData.password));
   cellUbah.innerHTML = '<input type="button" value="Ubah" />';
   cellUbah.onclick = function () {
                    window.location='ubah.php?id='+childData.user_id;
                };
   cellHapus.innerHTML = '<input type="button" value="Hapus" />';
   cellHapus.onclick = function () {
                    window.location='hapus.php?id='+childData.user_id;
                };

   rowIndex = rowIndex + 1;
    });
  });
  			

		function simpan_data(){
			var username = document.getElementById('username').value;
			var password = document.getElementById('password').value;
			var usid = firebase.database().ref().child('pengguna').push().key;
			var pass = md5(password); 

			var data = {
				user_id: usid,
				username: username,
				password: pass
			}

			var updates = {};
			updates['/pengguna/'+ usid] = data;
			firebase.database().ref().update(updates);

			alert('Berhasil menambah pengguna');
			reload_page();
		}

		function ubah_data(){

		}

		function hapus_data(){

		}
 		function reload_page(){
   			window.location.reload();
  		}
