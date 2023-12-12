export class CreateTodoDto{
    private constructor(
        public readonly text: string,
        public readonly completedAt?: Date|null,
    ){}

    static create(props: {[key:string]:any}):[string?,CreateTodoDto?]{
        const {text,completedAt}=props;

        if(!text) return ['Text property is required',undefined];

        let newcompletedAt=completedAt;
        if(completedAt) {
            newcompletedAt = new Date(completedAt);
            if(newcompletedAt.toString()==='Invalid Date'){
                return ['CompletedAt must be a valid date'];
            }
        }

        return [undefined,new CreateTodoDto(text,newcompletedAt)];
    }
}