import { IsNotEmpty } from "class-validator";

export class CreateBoardDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;
}



// DTO
// data transter object
// 계층간 데이터 교환을 위한 객체
// DB에서 데이터를 얻어 service나 controller 등으로 보낼때 사용하는 객체
// 데이터가 네트워크를 통해 전송되는 방법을 정의하는 개체
// interface class 이용 가능 But Nestjs 에선 class 추천
//
// 데이터 유효성을 체크하는데 효율적
// 안정적 코드를 위한 사용



// ****
// Built-in Pipes
// Nest JS 에 기본적으로 사용할 수 있게 만들어 놓은 6가지의 파이프가 있습니다.
// - ValidationPipe
// - ParseIntPipe
// - ParseBoolPipe
// - ParseArrayPipe
// - ParseUUIDPipe
// - DefaultValuePipe