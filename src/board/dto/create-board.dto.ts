import { IsNotEmpty } from "class-validator";


export class CreateBoardDTO{ // 런타임에서 작동하므로 파이프를 이용할때 유용하다 .
    @IsNotEmpty()
    title:string;

    @IsNotEmpty()
    description : string;
    
}