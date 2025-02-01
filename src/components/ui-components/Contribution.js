import React from "react";

const Contribution = ({ contributions }) => {
  return (
    <section className="contribution">
      <table>
        <thead>
          <tr>
            {contributions.shift().map((tableTeader) => (
              <th key={tableTeader}>{tableTeader}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {contributions.map((contribution) => {
            return (
              <tr key={contribution[0]}>
                <td>{contribution[0]}</td>
                <td>{contribution[1]}</td>
                <td>{contribution[2]}</td>
                <td>{contribution[3]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

export default Contribution;
