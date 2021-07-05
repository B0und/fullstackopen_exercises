import React from "react";

const Course = ({ courses }) => {
  return (
    <>
      {courses.map((course) => {
        return (
          <div key={course.id}>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />
          </div>
        );
      })}
    </>
  );
};

const Header = ({ course }) => {
  return <h2>{course.name}</h2>;
};

const Total = ({ course }) => {
  const sum = course.parts.reduce((sum, part) => sum + part.exercises, 0);
  return <p>Total of {sum} exercises</p>;
};

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  );
};

const Content = ({ course }) => {
  if (typeof course.parts !== "undefined") {
    return (
      <div>
        {course.parts.map((part) => (
          <Part part={part} key={part.id} />
        ))}
      </div>
    );
  } else {
    return (
      <div>
        <p>No course information</p>
      </div>
    );
  }
};

export default Course;
