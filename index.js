
let Transition = {
    verifySequence: [],
    states: [],
    alphabet: [],
    transitions: [],
    initialState: null,
    finalStates: []
}

const findTransition = (t) => {
    for(let i=0; i<Transition.transitions.length;i++)
        if(t.currentState === Transition.transitions[i].currentState && t.element === Transition.transitions[i].element)
            return Transition.transitions[i]
    return null
}

const checkSequence = () => {
    let i = 0
    let currentState = Transition.initialState
    const seq = Transition.verifySequence

    for(i;i<seq.length;i++){
        const nextTransition = findTransition({currentState: currentState, element: seq[i]})
        if(nextTransition){
            currentState = nextTransition.nextState
        } else return false
    }

    return Transition.finalStates.includes(currentState)
}

const initializeTransition = (data) => {

    //The first line has the sequence which needs to be verified
    Transition.verifySequence = data[0].split(',')

    //The second line has all possible states
    Transition.states = data[1].split(',')

    //The third line has all the accepted characters
    Transition.alphabet = data[2].split(',')

    //The fourth line has all the accepted transitions. Note: transitions are separated by;
    const transitions = data[3].split(';')
    transitions.forEach(transition =>{
        //We split the transitions to get every element
        const splitTransition = transition.split(',')

        //We create a list of objects, the objects are the transitions
        const newTransition = {
            currentState: splitTransition[0],
            element: splitTransition[1],
            nextState: splitTransition[2]
        }

        //We push the transition
        Transition.transitions.push(newTransition)
    })

    //The fifth line has the initial state
    Transition.initialState = data[4]

    //The sixth line has the final state
    Transition.finalStates = data[5]

    console.log("Printing...\n", Transition)
    console.log('The sequence is: ', checkSequence())

}

//Read from a file and initialize Transition
const readFromFile = async () => {

    const fs = await require('fs')
    const readline =  await require('readline')

    const lineReader = readline.createInterface({
        input: fs.createReadStream('fa.in')
    });

    let lines = []

    lineReader.on('line', function (line) {
        lines.push(line)
    }).on('close', function() {
        initializeTransition(lines)
    });
}

//Start the program function
const startProgram = async () =>{

    //You must put the sequence you wish to verify as parameter
    await readFromFile()
}

//Start the program
startProgram()

