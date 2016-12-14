$(document).ready(function() {
	var allActions;
	var UCDLists={};

	var authenticationSuccess = function() {
	    var kanban = '58515d76d31bcd0db04fdaf4';

	    var UCD_Board = '584acf6043a821eabc4001eb';
	    
	    var failure = function() {
			console.log("Tu chutiya hai");
		}

		var createList = function(allActions, i){
			if (i == -1){
				console.log("Returning emptiness");
				console.log(UCDLists);
			}
			else {
				var actionItem = allActions[i].type;

				if(actionItem == "createList"){
					var dataInfo = allActions[i].data;
					var listInfo = dataInfo.list;
					var listName = listInfo.name; 

					var newList = {
						name: listName,
						idBoard: UCD_Board,
						pos:'bottom'
					}
					
					Trello.post('/lists/', newList, function SuccessAdd(data){
						var tempData = data;
						var tempName = tempData.name;
						var tempPid = tempData.id;

						UCDLists.tempName = tempPid;
						
						console.log("SuccessAdd UCD Lists for " + i + " is ");
						console.log(UCDLists);
						
						createList(allActions,i-1);
					});
				}
				else if(actionItem == "createBoard"){
					console.log(i);
					createList(allActions,i-1);
				}
				else {
					console.log("Unknown");
				}
			}
		}

		var getSuccess = function(data) {
			console.log(data.length);
			createList(data, data.length-1);
			console.log("recursive call starting");
		}

		var link = "/boards/"+kanban+"/actions";
		Trello.get(link,getSuccess,failure);

	};

	var authenticationFailure = function() {
	    console.log("Failed authentication");
	};

	$('#update').click(function() {
		Trello.authorize({
			type: 'popup',
			name: 'Getting Started Application',
			scope: {
				read: 'true',
				write: 'true' },
			expiration: 'never',
			success: authenticationSuccess,
			error: authenticationFailure
		});
	});
});