const Alerta = ({ alerta }) => {
  return (
    <div
      className="text-center p-3  uppercase font-bold text-sm mb-6  "
      style={{ color: alerta.error ? '#EF4444' : '#10B981' }}
    >
      {alerta.msg}
    </div>
  );
};

export default Alerta;