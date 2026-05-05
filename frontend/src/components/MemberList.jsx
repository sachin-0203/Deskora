export default function MemberList({ members, onRemove }) {
  return (
    <div className="bg-white p-4 rounded-lg border shadow-sm h-full">
      <h2 className="font-semibold mb-3">Members</h2>

      {members.length === 0 ? (
        <p className="text-sm text-gray-500 overflow-auto">No members</p>
      ) : (
        <div className="space-y-2">
          {members.map((m) => (
            <div
              key={m.id}
              className="flex justify-between items-center border p-2 rounded"
            >
              <div>
                <p className="text-sm font-medium">{m.name}</p>
                <p className="text-xs text-gray-500">{m.email}</p>
                <p className="text-xs text-black bg-blue-100 px-1  w-fit rounded-sm">{m.role}</p>


              </div>

              { m.role != "admin" &&  <button
                onClick={() => onRemove(m.id)}
                className="text-red-500 text-xs hover:underline"
              >
                Remove
              </button>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}