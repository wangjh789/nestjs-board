import { BadRequestException, PipeTransform } from "@nestjs/common";
import { BoardStatus } from "../board.model";


export class BoardStatusValidationPipe implements PipeTransform{

    //readonly: 외부에서 접근은 가능하나 수정은 불가능하게.
    readonly StatusOption = [
        BoardStatus.PRIAVTE,
        BoardStatus.PUBLIC
    ] 
    transform(value:any,){
        value = value.toUpperCase()

        if(!this.isStatusValid(value)){
            throw new BadRequestException(`${value} isn't in the status options`)
        }

        return value;
    }

    private isStatusValid(status:any){
        const idx = this.StatusOption.indexOf(status)
        return idx !== -1
    }
}