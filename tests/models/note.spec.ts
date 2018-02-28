'use strict';

import { Note } from '../../src/models';

describe('NoteTest', () => {

  it('check basic model', () => {
    let note: Note = new Note({
        "id": 100,
        "target": "d--0000-0000-0000-0534",
        "timestamp": "2018-02-28T05:46:12Z",
        "note": "My Note",
        "type": "ui",
        "user_info": {
            "slug": "david",
            "tiny_avatar": "https://secure.gravatar.com/avatar/d7655ebeb646997cf070a3531bed3550?d=identicon&s=28",
            "username": "@david"
        },
        "attachment": {
            "id": "eaca791e-a84d-48d8-968f-b9c5ffd763b9",
            "title": "IMG_0314.jpg",
            "url": "https://iotile-cloud-media.s3.amazonaws.com/prod/s3file/note/eaca791e-a84d-48d8-968f-b9c5ffd763b9/IMG_0314%20%281%29.jpg?AWSAccessKeyId=ASIAJZLKEHA7VMTWZW4Q&x-amz-security-token=FQoDYXdzEM%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDCWEoykQDM0Ty5plCyK3A85yQE8oLH%2F1ptgRKmq0YhRYQynUSSVds8EkR2d4AiNBu7clUhIGHOPOCumKQT3wdwUF18iUC572DSga7QKthgXr4zRJfO4fMnGfGM346EmK9IUzTC3POyrOjIRCTRl4sVaefTp6fti9PXLrxYbA1OBPDdJ1gNIYBpmdECzkjLYkZk29R0t8Z2ntsvdpfuPYTyxpl7bmza9pm6i8tWmneYT5pkvtjv9%2BUJ18crphSM63TGXClQnbWQAupJTGs3ORcF6egAeaxMUUA%2BxW%2Bw6CWxNNG%2BDKulpGCFGmEQlfa%2FegFP%2FYeqfndtvgjb4J%2BqEN3PyhsESDl9Ty47t7SC5RYNflW5ffb0c1KxkFrxpLJ7AZxEDodg58tAn4%2Fyx18%2FJwN%2BxKQJ7pHitd9hIHcS21Ehiocf3ELKKPo5%2Bp3VOkAHd3%2B1tX2RomgCrd9bbpMfILpdaH8rRH6GOo6RbmdUtpb2Imm45JXzhIP5hDcHreEDsXcBQYfau%2B0jkduu6M1xyJAzfjEYWajrnXqihpy3gWp2KqbHVG8q3vcAHEkktKjgb70TnquVUz8huIjqzA6AqSwSEkLMlInCUoiY7Z1AU%3D&Expires=1519805038&Signature=6IR4485rJAzPsvjHirwqaujbh10%3D",
            "file_type": "image",
            "created_on": "2018-02-28T07:03:51Z",
            "created_by": 1
        }
    });

    expect(note.target).toBe('d--0000-0000-0000-0534');
    expect(note.note).toBe('My Note');
    expect(note.timestamp).toBe('2018-02-28T05:46:12Z');

    expect(note.userInfo.username).toBe('@david');
    expect(note.userInfo.slug).toBe('david');

    expect(note.attachment.title).toBe('IMG_0314.jpg');
    expect(note.attachment.fileType).toBe('image');
  });

  it('checks post note payload', () => {
    let note: Note = new Note({
        "id": 100,
        "target": "d--0000-0000-0000-0534",
        "timestamp": "2018-02-28T05:46:12Z",
        "note": "My Note",
        "type": "ui"
    });

    let payload: any = note.postPayload();
    expect(payload.target).toEqual('d--0000-0000-0000-0534');
    expect(payload.note).toBe('My Note');
    expect(payload.type).toBe('ui');
    expect(payload.timestamp).toBe('2018-02-28T05:46:12Z');
  });
});