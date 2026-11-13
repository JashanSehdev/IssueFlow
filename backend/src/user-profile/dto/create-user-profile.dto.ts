import { IsNumber, IsOptional, IsString } from "class-validator";


export class CreateUserProfileDto {

    @IsString()
    first_name : string

    @IsOptional()
    @IsString()
    last_name : string

    @IsNumber()
    age : number
}
