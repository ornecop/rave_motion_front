
const setProducer = (eventHome)=>{
    let producer = [];
    
    eventHome.map(e=>{
        producer.push(e.producer);
        })
    
    const arrayProducer = new Set(producer);
    const producerArray = Array.from(arrayProducer);
    return producerArray;   
}
export default setProducer;