import { Project } from "./model/project";

export default function projectArrayUnion(arr1: Project[], arr2: Project[]): Project[] {
    // var union = arr1.concat(arr2);

    // for (var i = 0; i < union.length; i++) {
    //     for (var j = i+1; j < union.length; j++) {
    //         if (union[i].id === union[j].id) {
    //             union.splice(j, 1);
    //             j--;
    //         }
    //     }
    // }
    const union = [...Array.from(new Set([...arr1, ...arr2]))]

    return union;
}