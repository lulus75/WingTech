import axios from 'axios';
import {generateRandomInt} from "../utils/random";

export async function getTrackingId(): Promise<string> {
  //  const url = "https://www.random.org/integers/?num=1&min=100000000&max=110000000&col=1&base=10&format=plain&rnd=new";
  //  const response = await axios.get(url);
   // return response.data;
    return  generateRandomInt(1000000000, 9999999999).toString();
}
