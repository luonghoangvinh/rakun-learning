import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Flashcard, FlashcardSchema } from "../flashcard/flashcard.entity";

@Schema()
export class Deck {
    @Prop()
    name!: string;

    @Prop()
    description?: string;


    @Prop({
        type: [FlashcardSchema],
        default: [],
    })
    cards?: Flashcard[];

    @Prop({ default: Date.now })
    createdAt!: Date;

    @Prop()
    color!: string;

    @Prop()
    icon!: string;

    @Prop({
        enum: ['personal', 'community'],
        default: 'personal',
    })
    visibility!: string;

    @Prop({ default: 0 })
    viewCount?: number;
}
export const DeckSchema =
    SchemaFactory.createForClass(Deck);