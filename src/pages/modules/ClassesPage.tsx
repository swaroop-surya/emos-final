import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import {
  Layers,
  Users,
  MapPin,
  CalendarCheck,
  BookOpen,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export const ClassesPage: React.FC = () => {
  const { classes, students, courses } = useData();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#131313]">
            Academic Classes & Cohorts
          </h1>
          <p className="text-xs text-[#62676B] mt-0.5">
            Class section allocations, lecture hall assignments, and enrolled student rosters.
          </p>
        </div>

        <button
          onClick={() => navigate('/app/attendance')}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#F9A51B] hover:bg-[#E58E08] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
        >
          <CalendarCheck className="w-3.5 h-3.5" />
          <span>Take Attendance</span>
        </button>
      </div>

      {/* Grid of Classes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {classes.map((cls) => {
          const classStudents = students.filter((s) => s.classId === cls.id);
          const studentCount = classStudents.length || cls.totalStudents;
          const classCourses = courses.filter((c) => c.classIds.includes(cls.id));

          return (
            <div
              key={cls.id}
              className="bg-white rounded-xl border border-[#DBDBD9] p-5 shadow-2xs hover:border-[#FAC95A] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-lg bg-[#FFF2D7] text-[#F9A51B] flex items-center justify-center font-bold text-sm">
                      <Layers className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-[#131313]">{cls.name}</h3>
                      <span className="text-[11px] text-[#62676B]">Academic Year {cls.academicYear}</span>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-[#23845B] bg-[#E6F4EC] px-2.5 py-1 rounded-full">
                    Active Term
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-4 text-xs">
                  <div className="p-3 bg-[#F9F9F8] rounded-lg border border-[#DBDBD9]/60">
                    <span className="text-[10px] text-[#919A9F] font-semibold uppercase block">
                      Enrolled Roster
                    </span>
                    <div className="flex items-center gap-1.5 mt-1">
                      <Users className="w-4 h-4 text-[#F9A51B]" />
                      <strong className="text-sm text-[#131313] tabular-nums font-bold">
                        {studentCount} Students
                      </strong>
                    </div>
                  </div>

                  <div className="p-3 bg-[#F9F9F8] rounded-lg border border-[#DBDBD9]/60">
                    <span className="text-[10px] text-[#919A9F] font-semibold uppercase block">
                      Lecture Hall
                    </span>
                    <div className="flex items-center gap-1.5 mt-1">
                      <MapPin className="w-4 h-4 text-[#F9A51B]" />
                      <span className="text-xs text-[#131313] font-medium truncate">
                        {cls.roomNumber}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#DBDBD9]/50 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-[#62676B]">
                    <span>Class Representative:</span>
                    <strong className="text-[#131313]">{cls.representativeName}</strong>
                  </div>

                  <div>
                    <span className="text-[11px] text-[#919A9F] font-medium block mb-1.5">
                      Curriculum Courses ({classCourses.length}):
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {classCourses.map((c) => (
                        <span
                          key={c.id}
                          className="px-2 py-0.5 rounded-md bg-[#FFF2D7] text-[#131313] border border-[#FAC95A]/50 text-[11px] font-medium"
                        >
                          {c.title}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-[#DBDBD9]/50 flex items-center justify-between gap-2">
                <button
                  onClick={() => navigate(`/app/students?classId=${cls.id}`)}
                  className="px-3 py-1.5 rounded-lg border border-[#DBDBD9] hover:bg-[#F3F3F1] text-xs font-medium text-[#131313] transition-colors cursor-pointer"
                >
                  View Student Roster
                </button>

                <button
                  onClick={() => navigate(`/app/attendance?classId=${cls.id}`)}
                  className="px-3 py-1.5 rounded-lg bg-[#F9A51B] hover:bg-[#E58E08] text-white text-xs font-semibold shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>Mark Attendance</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
