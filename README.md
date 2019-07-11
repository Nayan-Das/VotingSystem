
   
                      **ELECTRONIC VOTING SYSTEM** 
                                 **ON**
                       **AZURE** **HYPDERLEDGER**

     Team Name- Epsilon
     Nayan Das
     Vikash Kumar
     Summet Kumar

     COMPUTER SCIENCE & ENGINEERING 
     DEPARTMENT IIT KANPUR, KANPUR
 
#   
      

## INTRODUCTION

Election is considered as a festival of democracy. We face many hurdles to organize this festival . We can see every year people name get missing from the voting list due to error of election official or malpractice. We need to make our voting list error free from these manual intervention. We also see problem like accusation of EVM hacking and booth capturing .Our current voting system also not allow distant voting. So, people staying or working in different location face problem in voting. Creating Voter ID card also a cumbersome process. We should make this process simple ,secure,robust , tamper proof and transparent so that people can enjoy their festival.

  

## PROPOSED SOLUTION

We are proposing a Azura Hyperledger based solution to all current problems as follow-

-   **Apply Voter Card-** If a person already have Adhar card then voter Id will be automatically created when he/she turned eighteen. If anyone do not have Adhar card then they need to apply in the system by uploading their birth certificate and address proof. User can schedule document verification and bio-metric(finger print) registration request.
    
-   **Missing Name**-We will remove idea of manual voting list. We will store the voting list in blockchain. The list will be automatically updated when person age reach 18 based on given details while applying for Voter ID.
    
-   **Live in a Different Location-**  We will keep a drop box to select voter location as current and different. If polling officer choose different location,candidate details  will be loaded from the location of voter ID.
    
-   **Fake Voter and Booth Capturing-** There has many cases where people use other person voting card to vote in their name and some people capture booth for false voting. So,user need to give their finger print at the voting for verification before vote so no one can make false voting.
    
-   **Expedite Vote Counting-** We do not need to count the data manually, so we will keep the hyperlegeder query to count the vote constituency and candidate wise. Result can be out just after voting without any inconsistency.
    

## SYSTEM ARCHITECTURE

We will use Hyperledger composer to build our blockchain back end. Our web application (client side) will interact with the blockchain system with the help of REST APIs. Client side will be build using HTML, CSS, JavaScript, Ajax etc. We will use the database which is implicitly provided by Hyperledger. Currently,we have decided to run all the nodes on a single machine using docker container. Our future goal is to run it on multiple machines on the same network. Our model file will contain following- participant, asset,transaction.

-   ### PARTICIPANTS
    
    -   Voter
        
    -   ID Registration Officer
        
    -   Election Officer
        
    -   Polling Officer
        

  

-   ASSET
    
    -   Candidate
        
    -   Assembly
        
    -   Voter
        
    -   Ballot
        
    -   Voting Status
        
    
-   TRANSACTIONS
    
    -   Vote
        
    -   Create voter id
        
    -   Update voter information
        
    -   Delete voter information
        
    -   Register candidate
        
    -   Delete candidate
        
    -   Generate voting list (add voter details from Adhar)
        
    -   Add assembly
        
    -   Delete assembly
        
    -   Count vote
        
    -   Start Voting
        
    -   End Voting
        

  

-   ENDORSER
    
    -   Poling Officer
        
    -   Election Officer
        

  

  

**TESTING**

We are using Hyperledger composer which has inbuilt testing tool which supports three types of testing: interactive testing, automated unit testing and automated system testing.Ithas a command-lineinterfacethatprovidescommandsallowingyoutoeasilyruninteractive“smoke tests” to ensure the deployment was successful. This also makes it easy to execute tests in a CI/Dsystem.

System tests can also be created using Docker Compose and Mocha/Chai. You can start a runtime and deploy your business network definition, then programmatically create assets, submit transactions and inspect the state of asset registries.

