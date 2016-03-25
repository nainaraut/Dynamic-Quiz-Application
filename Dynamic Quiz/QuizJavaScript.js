			//global variable declaration
			var question = null;         //variable for storing the question object
			var correct = 0;             //variable to maintain the correct answers count
			var wrong = 0;               //variable to maintain the wrong answers count
			var count = 0;               //variable to count the number of questions attempted
			var myScore = 0;             //score
			var d = new Date();
		    var day = d.getDay();


			//logic to generate the index randomly without repeat
				var randomArr = [];
				var maxLength = 10;
			
			//function called on page load
			function myOnLoad()
			{
				//calling date function to get the current date
				var date = getDate();

				//display the current date using element date
				document.getElementById("date").innerHTML = date;

				//display the subject of the quiz
				document.getElementById("subject").innerHTML = getSubject();
				
				if (!randomArr.length) 
				{
					for (var i = 0; i <  maxLength; i++) {
						randomArr.push(i);
					}
				}
				   
				randomArr.sort(function(){return Math.random() - 0.5});  
			}
			
			//function called on the start button
			function quizStart()
			{
				$(".instruction").hide();
				$(".middle").show();
				document.getElementById("score_right").value = correct;
				document.getElementById("score_wrong").value = wrong;
				
				window.milisec = 15 * 60 * 1000;
				
				//Timer functionality
				var timer = setInterval(function()
				{	
					milisec -= 1000;
					var min = Math.floor( milisec / (60 * 1000) );
					var sec = Math.floor(( milisec - (60 * 1000 * min)) / 1000 );
					if(milisec <= 0)
					{
						clearInterval(timer);
						endQuiz();
					}
					else{
							if(min<10)
							{
								min = "0"+min;
							}
							if(sec<10)
							{
								sec = "0"+sec;
							}
							var result = "00:"+min+":"+sec;
							document.getElementById("timer").innerHTML = result;
						}
					},1000);
				
				nextQuestion();
			}
			
			//date function to get the current date
			function getDate()
			{
				var date = new Date();
				return date.toDateString();
			}
			
			//Display subject according to date
			function getSubject()
			{
				var subjects = {
					0:"General Knowledge",
					1:"Technology",
					2:"Politics",
					3:"Arts",
					4:"Sports",
					5:"Geography",
					6:"History"
				};
				
				var d = new Date();
				var day = d.getDay();
				return subjects[day];	
			}	
			
			//Restart function
			function startFromFirst()
			{
				$(".middle").hide();
				$(".instruction").show();
				count = 0;
				correct = 0;
				wrong = 0;
				score = 0;
			}

			//Call the next question
			function nextQuestion()
			{
				$("#oneword").hide();
				$("#multiple").hide();

				if(count >= 10)
					{
						count = 0;
						endQuiz();	
					}
				else{
					
					count++;

					//get the question object for next question
					if(day%2 == 0)
						question = getQuestion(randomArr[count-1]);
					else
						question = getQuestion(randomArr[count-1]);
					
					
					if(count > 1)
					{
							//update the progress bar
							progressBar();
							
							//update the score
							updateScore();
							
							//reset the form values
							document.getElementById("formName").reset();
					}

					
					//if multiple choice question
					if(question.questionType == 1)
					{
						$("#multiple").show();

						document.getElementById("question1").innerHTML = question.question;
						document.getElementById("label1").innerHTML = question.choices[0];
						document.getElementById("label2").innerHTML = question.choices[1];
						document.getElementById("label3").innerHTML = question.choices[2];
						document.getElementById("label4").innerHTML = question.choices[3];

						document.getElementById("radio1").setAttribute("value",question.choices[0]);
						document.getElementById("radio2").setAttribute("value",question.choices[1]);
						document.getElementById("radio3").setAttribute("value",question.choices[2]);
						document.getElementById("radio4").setAttribute("value",question.choices[3]);
					}
					//if single line question
					else if(question.questionType == 2)
					{
						$("#oneword").show();
						document.getElementById("question2").innerHTML = question.question;
					}
				}
			}

			
			//function to get a random question
			function getQuestion(ind)
			{
				//document.write("in question function");
				window.questions = [
					{
						question: "Grand Central Terminal, Park Avenue, New York is the world's",  
						questionType: 1,  
						choices: [ "largest railway station", "highest railway station","longest railway station","None of the above"],  
						correctChoice: "highest railway station",  
						score: 5 
					},
					{
						question: "Entomology is the science that studies",  
						questionType: 1,  
						choices: [ "Behavior of human beings", "Insects","history of technical and scientific terms","The formation of rocks"],  
						correctChoice: "Insects",  
						score: 5 
					},
					{
						question: "For which of the following disciplines is Nobel Prize awarded?",  
						questionType: 1,  
						choices: [ "Physics and Chemistry", "Physiology or Medicine","Literature, Peace and Economics","All of the above"],  
						correctChoice: "All of the above",  
						score: 5 
					},
					{
						question: "Hitler party which came into power in 1933 is known as",  
						questionType: 1,  
						choices: [ "Labour Party", "Nazi Party","Ku-Klux-Klan","Democratic Party"],  
						correctChoice: "Nazi Party",  
						score: 5 
					},
					{
						question: "Each year World Red Cross and Red Crescent Day is celebrated on",  
						questionType: 1,  
						choices: [ "May 8", "May 18","June 8","June 18"],  
						correctChoice: "May 8",  
						score: 5 
					},
					{
						question: "Where is the great Barrier Reef?",  
						questionType: 1,  
						choices: [ "Africa", "N.America","S.America","Asia","Australia"],  
						correctChoice: "Asutralia",  
						score: 5 
					},
					{
						question: "For the Olympics and World Tournaments, the dimensions of basketball court are",  
						questionType: 1,  
						choices: [ "26 m x 14 m", "28 m x 15 m","27 m x 16 m","28 m x 16 m"],  
						correctChoice: "28 m x 15 m",  
						score: 5 
					},
					{
						question: "Filaria is caused by",  
						questionType: 2,    
						correctAnswer: "Mosquito",  
						score: 10 
					},
					{
						question: "Fathometer is used to measure",  
						questionType: 2,  
						correctAnswer: "Ocean depth",  
						score: 10 
					},
					{
						question: "For seeing objects at the surface of water from a submarine under water, the instrument used is",  
						questionType: 2,  
						correctAnswer: "periscope",  
						score: 10 
					},
					{
						question: "East Timor, which became the 191st member of the UN, is in the continent of",  
						questionType: 2,  
						correctAnswer: "Asia",  
						score: 10 
					},
					{
						question: "First Afghan War took place in",  
						questionType: 2,  
						correctAnswer: "1839",  
						score: 10 
					}
				];

				var result = questions[ind]; 
				return result;
			}

			//function to get a random question
			function getQuestion2(ind)
			{
				//document.write("in question function");
				window.questions2 = [
					{
						question: "The Homolographic projection has the correct representation of",  
						questionType: 1,  
						choices: [ "shape", "area","baring","distance"],  
						correctChoice: "area",  
						score: 5 
					},
					{
						question: "The hazards of radiation belts include",  
						questionType: 1,  
						choices: [ "Behavior of human beings", "Insects","history of technical and scientific terms","The formation of rocks"],  
						correctChoice: "Insects",  
						score: 5 
					},
					{
						question: "For which of the following disciplines is Nobel Prize awarded?",  
						questionType: 1,  
						choices: [ "deterioration of circuits", "damage of solar cells","adverse living organisms","All of the above"],  
						correctChoice: "All of the above",  
						score: 5 
					},
					{
						question: "The great Victoria Desert is located in",  
						questionType: 1,  
						choices: [ "Canada", "West Africa","Australia","North America"],  
						correctChoice: "Australia",  
						score: 5 
					},
					{
						question: "The intersecting lines drawn on maps and globes are",  
						questionType: 1,  
						choices: [ "latitudes", "longitudes","geographic grids","None of the above"],  
						correctChoice: "geographic grids",  
						score: 5 
					},
					{
						question: "The light of distant stars is affected by",  
						questionType: 1,  
						choices: [ "the earth's atmosphere", "interstellar dust","both (a) and (b)","None of the above"],  
						correctChoice: "both (a) and (b)",  
						score: 5 
					},
					{
						question: "The landmass of which of the following continents is the least?",  
						questionType: 1,  
						choices: [ "Africa", "Asia","Australia","Europe"],  
						correctChoice: "Australia",  
						score: 5 
					},
					{
						question: "Apart from water, what runs through the mouth of the River Amazon and Lake Victoria?",  
						questionType: 2,    
						correctAnswer: "Equator",  
						score: 10 
					},
					{
						question: "Which country was previously called Abyssinia?",  
						questionType: 2,  
						correctAnswer: "Ethiopia",  
						score: 10 
					},
					{
						question: "What is the world's third largest sea",  
						questionType: 2,  
						correctAnswer: "Mediterranean",  
						score: 10 
					},
					{
						question: "Which country at the southern tip of the Arabian Peninsula was previously known as Aden?",  
						questionType: 2,  
						correctAnswer: "Yemen",  
						score: 10 
					},
					{
						question: "First Afghan War took place in",  
						questionType: 2,  
						correctAnswer: "1839",  
						score: 10 
					}
				];
				
				var result = questions2[ind]; 
				return result;
			}

			//progress bar function
			function progressBar()
			{
				var percent = ( count * 100 ) / questions.length;
				document.getElementById("progress").style.width = percent+"%";
			}
			
			//update score function
			function updateScore()
			{
				
				var checkElement = null;
				
				//if question type is multiple choice
				if(question.questionType == 1)
				{
					var checkElement;
					var inputVal = document.getElementsByName("radioName");

					//loop to get the checked option
					for(var i=0;i<inputVal.length;i++)
					{
						//if checked
						if(inputVal[i].checked)
							{
								//store the checked option value
								checkElement = inputVal[i].value;
								break;
							}
					}
					
					//if the checked option is correct
					if(checkElement == question.correctChoice)
					{
						//increment the correct answeres count
						correct = correct + 1;
						myScore = myScore + question.score;
					}
					else
					{
						//increment the wrong answeres count
						wrong = wrong + 1;
					}
				}
				else//if one line answer tpe question
				{
					//get the answer given by user
					var ans = document.getElementById("area").value;
					var ansUpper = ans.toUpperCase();
					var correctAns = question.correctAnswer.toUpperCase();

					//match it wit the correct answer
					if(ansUpper == correctAns)
					{
						//increment the correct answeres count
						correct = correct + 1;
						myScore = myScore + question.score;
					}
					else
					{
						//increment the wrong answeres count
						wrong = wrong + 1;
					}
				}
				
				document.getElementById("score_right").value = correct;
				document.getElementById("score_wrong").value = wrong;
			}

			//function when quit is pressed
			function endQuiz()
			{
				$(".middle").hide();
				$(".instruction").show();
				$(".instruction").children().hide();
				
				var marks = Math.floor(( myScore / 85 ) * 100);
				var finalText = "<p id='p1'>Thank you for taking the Quiz</p>";
				var finalScore = "<p id='p2'>Your final score is "+myScore+" out of 100</p>";
				$(".instruction").append(finalText);
				$(".instruction").append(finalScore);
			}
			