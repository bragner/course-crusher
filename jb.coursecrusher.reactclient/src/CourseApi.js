import axios from 'axios'

const CourseAPI = {
    courses: [
        {
            courseId: "mat001",
            name: "Math",
            owner: "Katten Larsson",
            questions: [
                {
                    questionPhrase: "1 + 1 = ?",
                    answer: "2",
                    questionId: "mat001q1"
                },
                {
                    questionPhrase: "2 + 2 = ?",
                    answer: "4",
                    questionId: "mat001q2"
                },
                {
                    questionPhrase: "3 + 3 = ?",
                    answer: "6",
                    questionId: "mat001q3"
                }
            ]
        },
        {
            courseId: "psy001",
            name: "Psychology",
            owner: "Dr Andersson",
            questions: [
                {
                    questionPhrase: "What is intelligence?",
                    answer: "Some clever answer.",
                    questionId: "psy001q1"
                },
                {
                    questionPhrase: "Why do we dream?",
                    answer: "Something something neurotransmitters something.",
                    questionId: "psy001q2"
                }
            ]
        },
        {
            courseId: "rel001",
            name: "Religion",
            owner: "Ms Yin",
            questions: [
                {
                    questionPhrase: "Who was Jesus?",
                    answer: "Jesus Christ! I don't know!",
                    questionId: "rel001q1"
                }
            ]
        }
      ],
      all: function() {
            axios.get(`https://localhost:44320/api/courses`)
            .then(res => {return res.data});
        },
      get: function(id) {
        const isCourse = course => course.courseId === id
        return this.courses.find(isCourse);  
      }
}

export default CourseAPI;