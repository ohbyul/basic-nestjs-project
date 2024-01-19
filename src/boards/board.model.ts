export enum BoardStatus {
    PUBLIC = 'PUBLIC',
    PRIVATE = 'PRIVATE'
}

export interface Board {
    id: string;
    title: string;
    description: string;
    status: BoardStatus;
}


// interface   > 변수의 타입만 체크
// class       > 변수의 타입 체크 + 인스턴트 생성 가능