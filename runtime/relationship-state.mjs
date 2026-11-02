// UI is derived from replayed choices, never from imported relationship counters.
export function relationshipStatus(world,c){
 const f=world.flags;
 if(f['couple160Ended_'+c])return '관계를 마치고 서로 거리를 두는 중';
 const pending=['strained','observing','testing'].includes(f['couple160State_'+c])||['unsettled','observing','testing'].includes(f['friction_'+c])||['hesitant','unsettled','observing','testing'].includes(f['bond140_'+c]);
 if(f['romance150Lover_'+c]&&['waiting','heard','practiced'].includes(f['separation200State_'+c]))return '관계를 어떻게 이어 갈지 함께 대화하는 중';
 if(f['romance150Lover_'+c])return pending?'연인 · 끝내지 못한 대화가 있음':'서로 확인한 연인';
 if(f['romance150Pressured_'+c])return '관계의 답을 재촉한 뒤 다시 대화할 시간이 필요함';
 if(f['romance150Paused_'+c])return '마음은 나눴지만 관계의 답은 보류 중';
 if(f['romance150Stage_'+c]===2)return '만나는 방식을 합의하고 다른 날의 답을 기다리는 중';
 if(f['romance150Stage_'+c]===1)return '서로 좋아하는 마음을 다시 말한 사이';
 if(f['relationshipIntent_'+c]==='friend')return '지금은 친구로 만나고 싶은 사이';
 if(f['closeness_'+c]===5)return '좋아하는 마음을 나눴고 관계의 이름은 아직 정하지 않음';
 return world.people[c]?.met?'서로 알아가는 사이':'아직 만나지 않음';
}
