import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator'

export class RegisterUserDTO {
  @IsString()
  @IsNotEmpty()
  readonly name: string

  @IsString()
  @IsEmail()
  readonly email: string

  @IsString()
  @IsNotEmpty()
  @Length(6, 100)
  readonly password: string
}
