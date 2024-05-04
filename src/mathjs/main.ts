import { Container } from 'typedi';
import { HcoService } from './hco-service';
import { User } from "./user";

export async function AppMain() {
    const user = new User()
    user.email = '8'
    const postService = Container.get(HcoService)
    const bool = await postService.userExist(user)
    console.log('------------bool-----------:', bool)
}


